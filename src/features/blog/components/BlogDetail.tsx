import { useLocation } from "react-router-dom";
import { Typography, Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useBlogById } from "../hooks/useGetBlogId";
import dayjs from "dayjs";
import { useCustomers } from "../../user/hook/useGetCustomer";

const { Title, Text } = Typography;

const BlogDetail = () => {
  const location = useLocation();
  const { blogId } = location.state || {};
  const { data: blog } = useBlogById(blogId || "");
  const { data: customer } = useCustomers();

  const getCustomerName = (customerId: number) => {
    return customer?.find((c) => c.customerId === customerId)?.name;
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        background: "#fff",
      }}
    >
      {/* Tiêu đề bài viết */}
      <Card
        cover={
          <img
            alt={blog?.title}
            src={blog?.image}
            style={{ width: "100%", objectFit: "cover", height: "400px" }}
          />
        }
        bordered={false}
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <Title level={2}>{blog?.title}</Title>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Avatar icon={<UserOutlined />} style={{ marginRight: "10px" }} />
          <Text>
            Bởi{" "}
            {blog?.customerId !== undefined
              ? getCustomerName(blog.customerId)
              : ""}{" "}
            | {dayjs(blog?.createAt).format("DD [tháng] MM, YYYY")}
          </Text>
        </div>
      </Card>

      {/* <Card
        bordered={false}
        style={{
          marginTop: "20px",
          borderRadius: "10px",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <img
          alt="Quảng cáo"
          src={blogDetail.adImage}
          style={{ width: "100%", objectFit: "cover" }}
        />
        <Text type="secondary">Bạn có thể đặt quảng cáo 750x100</Text>
      </Card> */}
    </div>
  );
};

export default BlogDetail;
