/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Table,
  Space,
  Input as AntInput,
  message,
  Button,
  Modal,
  Flex,
  Skeleton,
  Empty,
  Tooltip,
  Descriptions,
  Select,
} from "antd";
import { useUsers } from "../hook/useGetUser";
import { useUserStore } from "../hook/useUserStore";
import { PlusOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { useCreateUser } from "../hook/useCreateUser";
import { ColumnsType } from "antd/es/table";
import { UserDto } from "../dto/get-user.dto";
import { Form } from "antd";

const UserTable = () => {
  const { data, isLoading, error } = useUsers();
  const { mutate: createUser } = useCreateUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [form] = Form.useForm();
  const { users, setUsers } = useUserStore();
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  const handleCreate = () => {
    setIsModalOpen(true);
    setSelectedUser(null);
    form.resetFields();
  };

  const handleCreateUser = () => {
    form
      .validateFields()
      .then((values) => {
        createUser(values, {
          onSuccess: () => {
            message.success("Tạo người dùng thành công");
            setIsModalOpen(false);
            form.resetFields();
          },
          onError: (err) => {
            message.error(`Lỗi tạo người dùng: ${err.message}`);
          },
        });
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const handleViewDetails = (record: any) => {
    setSelectedUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const filteredUsers = users?.filter((user: any) =>
    user.accountName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<UserDto> = [
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
      dataIndex: "accountId",
      key: "accountId",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: any) => (
        <Space>
          <Tooltip title="Chi tiết">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
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
    return <div>Error loading users</div>;
  }

  const isCreating = !selectedUser;

  return (
    <div>
      <Flex gap="middle" justify="space-between">
        <div className="content-header">Danh sách người dùng</div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Tạo User
        </Button>
      </Flex>
      <hr style={{ opacity: 0.1 }} />
      <Space direction="vertical" style={{ width: "100%" }}>
        <AntInput
          prefix={<SearchOutlined />}
          placeholder="Nhập tên người dùng cần tìm"
          style={{ border: "none", backgroundColor: "transparent" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Space>
      <hr style={{ opacity: 0.1 }} />
      <Table
        dataSource={filteredUsers || []}
        columns={columns}
        rowKey="accountId"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"],
        }}
        onChange={handleTableChange}
        locale={{
          emptyText: isLoading ? <Skeleton active={true} /> : <Empty />,
        }}
      />

      <Modal
        title={isCreating ? "Tạo người dùng" : "Chi tiết người dùng"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={isCreating ? handleCreateUser : undefined}
        width={600}
        cancelText="Hủy"
        okText={isCreating ? "Tạo" : "Đóng"}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            {isCreating ? (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            ) : (
              <Button onClick={() => setIsModalOpen(false)}>Đóng</Button>
            )}
          </>
        )}
      >
        {isCreating ? (
          <Form form={form} layout="vertical">
            <Form.Item
              name="accountName"
              label="Account Name"
              rules={[
                { required: true, message: "Please enter the account name!" },
              ]}
            >
              <AntInput />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter the password!" },
              ]}
            >
              <AntInput.Password />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select
                showSearch
                placeholder="Select role"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: "Admin", label: "Admin" },
                  { value: "Staff", label: "Staff" },
                  { value: "Skintherapist", label: "Skintherapist" },
                  { value: "Customer", label: "Customer" },
                ]}
              />
            </Form.Item>
          </Form>
        ) : (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">
              {selectedUser?.accountId}
            </Descriptions.Item>
            <Descriptions.Item label="Account Name">
              {selectedUser?.accountName}
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              {selectedUser?.role}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default UserTable;
