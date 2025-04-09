/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  Space,
  Input as AntInput,
  Skeleton,
  Tooltip,
  Button,
  Modal,
  Form,
  Flex,
  Image,
  Empty,
} from "antd";
import { useBlogs } from "../hooks/useGetBlog";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { BlogDto } from "../dto/blog.dto";
import dayjs from "dayjs";
import { useCustomers } from "../../user/hook/useGetCustomer";
import { CustomerDto } from "../../user/dto/customer.dto";

const BlogTable = () => {
  const { data, isLoading, error } = useBlogs();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [form] = Form.useForm();
  const { data: customerData } = useCustomers();

  const handleView = (record: any) => {
    setSelectedBlog(record);
    setIsViewModalOpen(true);
    form.setFieldsValue(record);
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const filteredBlogs = data?.filter((blog: any) =>
    blog.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const customerMap = new Map<number, CustomerDto>();
  if (customerData) {
    customerData.forEach((customer) => {
      customerMap.set(customer.customerId, customer);
    });
  }

  const columns: ColumnsType<BlogDto> = [
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
      dataIndex: "blogId",
      key: "blogId",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Customer",
      dataIndex: "customerId",
      key: "customerId",
      render: (customerId: number) => {
        const customer = customerMap.get(customerId);
        return customer ? customer.name : customerId;
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? (
          <Image
            src={image}
            width={50}
            height={50}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Image" />
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt: string) =>
        createAt ? dayjs(createAt).format("DD/MM/YYYY HH:mm:ss") : "N/A",
      sorter: (a, b) =>
        dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf(),
      defaultSortOrder: "ascend",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: any) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error loading blogs</div>;
  }

  return (
    <div>
      <Flex gap="middle" justify="space-between">
        <div className="content-header">Danh sách blog</div>
      </Flex>
      <hr style={{ opacity: 0.1 }} />
      <Space direction="vertical" style={{ width: "100%" }}>
        <AntInput
          prefix={<SearchOutlined />}
          placeholder="Nhập blog cần tìm"
          style={{ border: "none", backgroundColor: "transparent" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Space>
      <hr style={{ opacity: 0.1 }} />
      <Table
        dataSource={filteredBlogs || []}
        columns={columns}
        rowKey="blogId" // Sửa rowKey thành blogId thay vì serviceId
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
        title="Chi tiết Blog"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Đóng
          </Button>,
        ]}
        width={600}
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Tiêu đề">
            <AntInput disabled />
          </Form.Item>
          <Form.Item name="content" label="Nội dung">
            <AntInput.TextArea disabled rows={4} />
          </Form.Item>
          <Form.Item name="customerId" label="Customer ID">
            <AntInput disabled />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
            {selectedBlog?.image ? (
              <Image
                src={selectedBlog.image}
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No Image"
              />
            )}
          </Form.Item>
          <Form.Item label="Ngày tạo">
            <span>
              {selectedBlog?.createAt
                ? dayjs(selectedBlog.createAt).format("DD/MM/YYYY HH:mm:ss")
                : "N/A"}
            </span>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogTable;
