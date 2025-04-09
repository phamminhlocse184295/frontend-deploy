import { Card, Row, Col, Typography, Avatar, Button } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PagePath } from "../../../enums/page-path.enum";
import { useBlogs } from "../hooks/useGetBlog";
import dayjs from "dayjs";
import { useCustomers } from "../../user/hook/useGetCustomer";

const { Title, Text } = Typography;

// const featuredPost = {
//   id: 0,
//   title: "Tác Động Của Công Nghệ Đến Nơi Làm Việc: Sự Thay Đổi Ra Sao",
//   author: "Tracey Wilson",
//   date: "20 Tháng 8, 2022",
//   coverImage: "https://via.placeholder.com/800x400",
//   category: "Công Nghệ",
// };

// const blogPosts = [
//   {
//     id: 1,
//     title: "Tác Động Của Công Nghệ Đến Nơi Làm Việc: Sự Thay Đổi Ra Sao",
//     author: "Tracey Wilson",
//     date: "20 Tháng 8, 2022",
//     coverImage: "https://via.placeholder.com/300x200",
//     category: "Công Nghệ",
//   },
//   {
//     id: 2,
//     title: "Cách Tăng Năng Suất Trong Môi Trường Làm Việc Từ Xa",
//     author: "Jason Francisco",
//     date: "20 Tháng 8, 2022",
//     coverImage: "https://via.placeholder.com/300x200",
//     category: "Năng Suất",
//   },
//   {
//     id: 3,
//     title: "Top 10 Điểm Đến Du Lịch Hàng Đầu Năm 2023",
//     author: "Elizabeth Slavin",
//     date: "30 Tháng 8, 2022",
//     coverImage: "https://via.placeholder.com/300x200",
//     category: "Du Lịch",
//   },
// ];

const BlogPage = () => {
  const navigate = useNavigate();
  const { data: blogData } = useBlogs();
  const { data: customer } = useCustomers();

  const getCustomerName = (customerId: number) => {
    return customer?.find((c) => c.customerId === customerId)?.name;
  };

  const handleNavigate = (blogId: number) => {
    navigate(PagePath.BLOG_DETAIL, {
      state: {
        blogId: blogId,
      },
    });
  };

  const handleCreateBlog = () => {
    if (customer?.[0]?.customerId) {
      navigate(PagePath.CREATE_BLOG, {
        state: { customerId: customer[0].customerId },
      });
    } else {
      console.warn("Không tìm thấy customerId của user hiện tại");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateBlog}
        >
          Tạo Blog
        </Button>
      </div>
      <div style={{ marginBottom: "30px" }}>
        <Card
          hoverable
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
          }}
          className="blog"
          cover={
            <img
              alt={blogData?.[0].title}
              src={blogData?.[0].image}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />
          }
          onClick={() =>
            blogData?.[0]?.blogId !== undefined &&
            handleNavigate(blogData[0].blogId)
          }
        >
          {/* <Tag color="blue">{featuredPost.category}</Tag> */}
          <Title
            level={2}
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              // textAlign: "center",
            }}
          >
            {blogData?.[0].title}
          </Title>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Avatar icon={<UserOutlined />} style={{ marginRight: "10px" }} />
            <Text>
              {blogData?.[0].customerId !== undefined &&
                getCustomerName(blogData[0].customerId)}{" "}
              &nbsp;|&nbsp; <CalendarOutlined />{" "}
              {dayjs(blogData?.[0].createAt).format("DD [tháng] MM, YYYY")}
            </Text>
          </div>
        </Card>
      </div>

      <Row gutter={[16, 16]}>
        {blogData?.slice(1).map((blog) => (
          <Col xs={24} sm={12} md={8} key={blog.blogId}>
            <Card
              hoverable
              cover={
                <img
                  alt={blog.title}
                  src={blog.image}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
              }
              style={{ borderRadius: "10px", overflow: "hidden" }}
              onClick={() => handleNavigate(blog.blogId)}
            >
              {/* <Tag color="blue">{post.category}</Tag> */}
              <Title level={4} style={{ marginTop: "10px" }}>
                {blog.title}
              </Title>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Avatar
                  icon={<UserOutlined />}
                  style={{ marginRight: "10px" }}
                />
                <Text>
                  {getCustomerName(blog.customerId)} &nbsp;|&nbsp;{" "}
                  <CalendarOutlined />{" "}
                  {dayjs(blog.createAt).format("DD [tháng] MM, YYYY")}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogPage;
