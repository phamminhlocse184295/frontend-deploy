import { Link, useParams } from "react-router-dom";
import { Spin, Descriptions, Breadcrumb, Tag, Typography, Input } from "antd";
import { useUserById } from "../hook/useGetUserId";

const { Title } = Typography;

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: user, isLoading, isError } = useUserById(id || "");

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError || !user) {
    return <div>Không tìm thấy người dùng</div>;
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/Home/User">Danh sách người dùng</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết người dùng</Breadcrumb.Item>
      </Breadcrumb>
      <Title level={3}>Chi tiết người dùng</Title>
      {/* <Descriptions column={2}>
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        <Descriptions.Item label="Tên">
          <Input disabled value={user.name} />
          {user.name}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">
          {new Date(user.dateofbirth).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Giới tính">
          {user.gender ? "Nam" : "Nữ"}
        </Descriptions.Item>
        <Descriptions.Item label="Lớp">{user.class}</Descriptions.Item>
        <Descriptions.Item label="Ảnh">
          <Image
            src={user.image}
            width={100}
            height={100}
            style={{ borderRadius: "50%" }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Phản hồi">
          <Tag color={user.feedback === "good" ? "green" : "red"}>
            {user.feedback?.toUpperCase()}
          </Tag>
        </Descriptions.Item>
      </Descriptions> */}
      <Descriptions column={1}>
        <Descriptions.Item label="ID">
          <Input disabled value={user.id} />
        </Descriptions.Item>
        <Descriptions.Item label="Tên">
          {/* <Input disabled value={user.name} /> */}
          <Input disabled value={user.name} />
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">
          <Input
            disabled
            value={new Date(user.dateofbirth).toLocaleDateString()}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Giới tính">
          <Input disabled value={user.gender ? "Nam" : "Nữ"} />
        </Descriptions.Item>
        <Descriptions.Item label="Lớp">
          <Input disabled value={user.class} />
        </Descriptions.Item>
        {/* <Descriptions.Item label="Ảnh">
          <Image
            src={user.image}
            width={100}
            height={100}
            style={{ borderRadius: "50%" }}
          />
        </Descriptions.Item> */}
        <Descriptions.Item label="Phản hồi">
          <Tag color={user.feedback === "good" ? "green" : "red"}>
            {user.feedback?.toUpperCase()}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default UserDetail;
