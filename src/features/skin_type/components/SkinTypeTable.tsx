/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  Input as AntInput,
  Button,
  message,
  Modal,
  Form,
  Space,
  Tooltip,
  Image,
  Flex,
  Upload,
  Switch,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useSkinTypes } from "../hooks/useGetSkin";
import { useDeleteSkin } from "../hooks/useDeleteSkin";
import { useCreateSkin } from "../hooks/useCreateSkin";
import { useUpdateSkin } from "../hooks/useUpdateSkin";
import { TablePaginationConfig } from "antd/es/table";
import { SkinDto } from "../dto/skin.dto";
import { ColumnsType } from "antd/es/table";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebase";

const SkinTypeTable = () => {
  const { data: skinData, isLoading, refetch } = useSkinTypes();
  const { mutate: deleteSkinType } = useDeleteSkin();
  const { mutate: createSkinType } = useCreateSkin();
  const { mutate: updateSkinType } = useUpdateSkin();

  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkin, setEditingSkin] = useState<any>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [skintypeToDelete, setSkintypeToDelete] = useState<any>(null);
  const [, setUploading] = useState(false);
  const [, setImageAsFile] = useState<File | null>(null);
  const [form] = Form.useForm();

  const filterSkins = skinData?.filter((skin: any) =>
    skin.skintypeName.toLowerCase().includes(searchText.toLowerCase())
  );

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
        } catch (error) {
          setUploading(false);
          message.error("Lỗi khi lấy URL hình ảnh!");
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  // const handleDeleteSkin = (skintypeId: number) => {
  //   deleteSkinType(skintypeId, {
  //     onSuccess: () => {
  //       message.success("Xóa loại da thành công");
  //       refetch();
  //     },
  //     onError: () => {
  //       message.error("Xóa loại da thất bại");
  //     },
  //   });
  // };

  const handleCreate = () => {
    setIsModalOpen(true);
    form.resetFields();
    form.setFieldsValue({ status: "Active" });
    setImageAsFile(null);
  };

  const handleCreateSkin = () => {
    form.validateFields().then((values) => {
      createSkinType(values, {
        onSuccess: () => {
          message.success("Tạo loại da thành công");
          setIsModalOpen(false);
          form.resetFields();
          refetch();
        },
        onError: () => {
          message.error("Tạo loại da thất bại");
        },
      });
    });
  };

  const handleEdit = (record: any) => {
    setEditingSkin(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
    setImageAsFile(null);
  };

  const handleDelete = (skintypeId: number) => {
    setSkintypeToDelete(skintypeId);
    setDeleteModalOpen(true);
  };

  const handleDeleteSkin = () => {
    if (skintypeToDelete) {
      deleteSkinType(skintypeToDelete, {
        onSuccess: () => {
          message.success("Xóa loại da thành công");
          setDeleteModalOpen(false);
          setSkintypeToDelete(null);
          refetch();
        },
        onError: (err: { message: any }) => {
          message.error(`Lỗi xóa loại da: ${err.message}`);
        },
      });
    }
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        updateSkinType(
          { skintypeId: editingSkin.skintypeId, data: values },
          {
            onSuccess: () => {
              message.success("Cập nhật loại da thành công");
              setIsModalOpen(false);
              setEditingSkin(null);
            },
            onError: (err) => {
              message.error(`Lỗi cập nhật loại da: ${err.message}`);
            },
          }
        );
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const columns: ColumnsType<SkinDto> = [
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
      dataIndex: "skintypeId",
      key: "skintypeId",
    },
    {
      title: "Loại da",
      dataIndex: "skintypeName",
      key: "skintypeName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (description: string) => {
        return <div dangerouslySetInnerHTML={{ __html: description }} />;
      },
    },
    {
      title: "Lợi ích",
      dataIndex: "pros",
      key: "pros",
      render: (pros: string) => {
        return <div dangerouslySetInnerHTML={{ __html: pros }} />;
      },
    },
    {
      title: "Bất lợi",
      dataIndex: "cons",
      key: "cons",
      render: (cons: string) => {
        return <div dangerouslySetInnerHTML={{ __html: cons }} />;
      },
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
      title: "Actions",
      render: (_: unknown, record: SkinDto) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.skintypeId)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Flex gap="middle" justify="space-between">
        <div className="content-header">Danh sách loại da</div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Tạo loại da
        </Button>
      </Flex>
      <hr style={{ opacity: 0.1 }} />
      <Space direction="vertical" style={{ width: "100%" }}>
        <AntInput
          prefix={<SearchOutlined />}
          placeholder="Nhập loại da cần tìm"
          style={{ border: "none", backgroundColor: "transparent" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Space>
      <hr style={{ opacity: 0.1 }} />
      <Table
        columns={columns}
        dataSource={filterSkins}
        loading={isLoading}
        pagination={pagination}
        rowKey="skintypeId"
        onChange={(pagination: TablePaginationConfig) =>
          setPagination({
            current: pagination.current || 1,
            pageSize: pagination.pageSize || 10,
          })
        }
      />

      <Modal
        title={editingSkin ? "Cập nhật loại da" : "Tạo loại da"}
        open={isModalOpen}
        onOk={editingSkin ? handleUpdate : handleCreateSkin}
        onCancel={() => setIsModalOpen(false)}
        okText={editingSkin ? "Cập nhật" : "Tạo"}
        centered
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: "Active" }}
        >
          <Form.Item
            name="skintypeName"
            label="Tên loại da"
            rules={[{ required: true, message: "Vui lòng nhập tên loại da" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="introduction"
            label="Giới thiệu"
            rules={[{ required: true, message: "Vui lòng nhập giới thiệu" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <AntInput.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Hoạt động"
            valuePropName="checked"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Switch
              onChange={(checked) => {
                form.setFieldsValue({
                  status: checked ? "Active" : "Inactive",
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="pros"
            label="Lợi ích"
            rules={[{ required: true, message: "Vui lòng nhập lợi ích" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="cons"
            label="Bất lợi"
            rules={[{ required: true, message: "Vui lòng nhập bất lợi" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="skincareGuide"
            label="Hướng dẫn chăm sóc da"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập hướng dẫn chăm sóc da",
              },
            ]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="image"
            label="Hình ảnh"
            rules={[{ required: true, message: "Vui lòng nhập hình ảnh" }]}
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
                  alt="skintype Image"
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
          <Button key="delete" type="primary" danger onClick={handleDeleteSkin}>
            Xóa
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa loại da này không?</p>
      </Modal>
    </div>
  );
};

export default SkinTypeTable;
