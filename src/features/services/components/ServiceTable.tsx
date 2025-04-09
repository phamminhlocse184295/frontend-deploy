/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Table,
  Space,
  Input as AntInput,
  Form,
  message,
  Button,
  Modal,
  Flex,
  Image,
  Skeleton,
  InputNumber,
  Empty,
  Tooltip,
  Upload,
  Switch,
} from "antd";
import { useServices } from "../hooks/useGetService";
import { useServiceStore } from "../hooks/useServiceStore";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useCreateService } from "../hooks/useCreateService";
import { useUpdateService } from "../hooks/useUpdateService";
import { useDeleteService } from "../hooks/useDeleteService";
import { ColumnsType } from "antd/es/table";
import { ServiceDto } from "../dto/get-service.dto";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import CustomUpdateStatusModal from "../../../components/CustomUpdateStatusModal";

const ServiceTable = () => {
  const { data, isLoading, error, refetch: refetchService } = useServices();
  const { mutate: createService } = useCreateService();
  const { mutate: updateService } = useUpdateService();
  const { mutate: deleteService } = useDeleteService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [form] = Form.useForm();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<any>(null);
  const { services, setServices } = useServiceStore();
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [, setUploading] = useState(false);
  const [, setImageAsFile] = useState<File | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setServices(data);
    }
  }, [data, setServices]);

  const handleFireBaseUpload = (file: File) => {
    if (!file) {
      message.error("Vui lòng chọn một hình ảnh!");
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        setUploading(false);
        message.error(`Lỗi khi upload hình ảnh: ${error.message}`);
        console.error("Upload error:", error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          form.setFieldsValue({ image: downloadURL });
          setUploading(false);
          message.success("Upload hình ảnh thành công!");
          // console.log("File available at", downloadURL);
        } catch (error) {
          setUploading(false);
          message.error("Lỗi khi lấy URL hình ảnh!");
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  const handleCreate = () => {
    setEditingService(null);
    setIsModalOpen(true);
    form.resetFields();
    setImageAsFile(null);
  };

  const handleCreateService = () => {
    form
      .validateFields()
      .then((values) => {
        createService(values, {
          onSuccess: () => {
            message.success("Tạo dịch vụ thành công");
            setIsModalOpen(false);
            form.resetFields();
            refetchService();
          },
          onError: (err: { message: any }) => {
            message.error(`Lỗi tạo người dùng: ${err.message}`);
          },
        });
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const handleEdit = (record: any) => {
    setEditingService(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
    setImageAsFile(null);
  };

  const handleDelete = (serviceId: string) => {
    setServiceToDelete(serviceId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
      deleteService(serviceToDelete, {
        onSuccess: () => {
          message.success("Xóa dịch vụ thành công");
          setDeleteModalOpen(false);
          setServiceToDelete(null);
          refetchService();
        },
        onError: (err: { message: any }) => {
          message.error(`Lỗi xóa dịch vụ: ${err.message}`);
        },
      });
    }
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        updateService(
          { serviceId: editingService.serviceId, data: values },
          {
            onSuccess: () => {
              message.success("Cập nhật dịch vụ thành công");
              setIsModalOpen(false);
              setEditingService(null);
              refetchService();
            },
            onError: (err: { message: any }) => {
              message.error(`Lỗi cập nhật dịch vụ: ${err.message}`);
            },
          }
        );
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const handleStatusChange = (record: any) => {
    setSelectedService(record);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (selectedService) {
      const newStatus =
        selectedService.status === "Active" ? "Inactive" : "Active";
      updateService(
        {
          serviceId: selectedService.serviceId,
          data: { ...selectedService, status: newStatus },
        },
        {
          onSuccess: () => {
            message.success(
              `Đã ${newStatus === "Active" ? "bật" : "tắt"} dịch vụ thành công`
            );
            setIsStatusModalOpen(false);
            setSelectedService(null);
            refetchService();
          },
          onError: (err: { message: any }) => {
            message.error(`Lỗi cập nhật trạng thái: ${err.message}`);
          },
        }
      );
    }
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const filteredServices = services?.filter((service: any) =>
    service.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<ServiceDto> = [
    {
      title: "No",
      dataIndex: "No",
      fixed: "left",
      width: 50,
      render: (_value: any, _record: any, index: number) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "ID",
      dataIndex: "serviceId",
      key: "serviceId",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "dateofbirth",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Image
          src={image}
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Procedure Description",
      dataIndex: "procedureDescription",
      key: "procedureDescription",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_: unknown, record: any) => (
        <Switch
          checked={record.status === "Active"}
          onChange={() => handleStatusChange(record)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: any) => (
        <Space>
          <Tooltip title="Chi tiết">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.serviceId)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error loading service</div>;
  }

  return (
    <div>
      <Flex gap="middle" justify="space-between">
        <div className="content-header">Danh sách dịch vụ</div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Tạo dịch vụ
        </Button>
      </Flex>
      <hr style={{ opacity: 0.1 }} />
      <Space direction="vertical" style={{ width: "100%" }}>
        <AntInput
          prefix={<SearchOutlined />}
          placeholder="Nhập dịch vụ cần tìm"
          style={{ border: "none", backgroundColor: "transparent" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Space>
      <hr style={{ opacity: 0.1 }} />
      <Table
        dataSource={filteredServices || []}
        columns={columns}
        rowKey="serviceId"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
        onChange={handleTableChange}
        locale={{
          emptyText: isLoading ? <Skeleton active={true} /> : <Empty />,
        }}
      />

      <Modal
        title={editingService ? "Cập nhật dịch vụ" : "Tạo dịch vụ"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={editingService ? handleUpdate : handleCreateService}
        width={600}
        centered
        cancelText="Hủy"
        okText={editingService ? "Cập nhật" : "Tạo"}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên dịch vụ"
            rules={[{ required: true, message: "Please enter the name!" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Please enter the price!" }]}
          >
            <InputNumber min={0} style={{ width: "-webkit-fill-available" }} />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Tổng thời gian làm"
            rules={[{ required: true, message: "Please enter the duration!" }]}
          >
            <InputNumber min={15} style={{ width: "-webkit-fill-available" }} />
          </Form.Item>
          <Form.Item name="averageStars" label="Rating">
            <InputNumber disabled />
          </Form.Item>
          <Form.Item
            name="image"
            label="Hình ảnh"
            rules={[{ required: true, message: "Please enter the image!" }]}
          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={(file) => {
                handleFireBaseUpload(file);
                return false;
              }}
              accept="image/*"
            >
              {form.getFieldValue("image") ? (
                <Image
                  src={form.getFieldValue("image")}
                  alt="Service Image"
                  style={{ width: "100%", height: "100%" }}
                  preview={false}
                />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="procedureDescription"
            label="Bước chăm sóc"
            rules={[
              {
                required: true,
                message: "Please enter the procedure description!",
              },
            ]}
          >
            <AntInput />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalOpen}
        style={{ width: "max-content" }}
        onCancel={() => setDeleteModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setDeleteModalOpen(false)}>
            Hủy
          </Button>,
          <Button key="delete" type="primary" danger onClick={confirmDelete}>
            Xóa
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa dịch vụ này không?</p>
      </Modal>

      <CustomUpdateStatusModal
        custom={selectedService?.status === "Active" ? "red" : "blue"}
        isOpen={isStatusModalOpen}
        title={`Xác nhận thay đổi trạng thái`}
        subTitle={[
          "Bạn có chắc chắn muốn tắt trạng thái sử dụng của dịch vụ này không?",
        ]}
        textClose="Hủy"
        handleClose={() => setIsStatusModalOpen(false)}
        handleConfirm={handleConfirmStatusChange}
      />
    </div>
  );
};

export default ServiceTable;
