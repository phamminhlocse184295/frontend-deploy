import { useState, useEffect } from "react";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // BellFilled,
  UserOutlined,
  LogoutOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  CustomerServiceOutlined,
  HourglassOutlined,
  SkinOutlined,
  QuestionOutlined,
  BookOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Button,
  Dropdown,
  Modal,
  // Popover,
} from "antd";
import type { MenuProps } from "antd";
import { Link, useLocation, Outlet } from "react-router-dom";
import "../style/Home.css";
import useAuthStore from "../features/authentication/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { PagePath } from "../enums/page-path.enum";
import { RoleCode } from "../enums/role.enum";
import { useGetTherapistProfile } from "../features/authentication/hooks/useGetTherapistProfile";

const { Header, Content, Sider } = Layout;

// const notificationContent = (
//   <div>
//     <p>Chưa có thông báo</p>
//     <BellFilled
//       style={{
//         fontSize: "25px",
//         display: "block",
//         cursor: "pointer",
//       }}
//     />
//   </div>
// );

const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();
  const { data: profileData } = useGetTherapistProfile(
    user?.accountId,
    user?.role
  );

  const profile = Array.isArray(profileData) ? profileData[0] : undefined;
  const therapist = profile?.skinTherapists?.[0] ?? null;

  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     if (!token || !user) return;

  //     try {
  //       const response = await fetch(
  //         `https://dev.ddc.fis.vn/econstruction_api/users/get_one?username=${user.username}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();

  //       console.log("User Details API Response:", data);

  //       if (data.statusCode === 1 && data.data.length > 0) {
  //         setUsername(data.data[0].username);
  //       } else {
  //         // message.error("Failed to fetch user details");
  //       }
  //     } catch (error) {
  //       message.error(
  //         "Error fetching user details: " + (error as Error).message
  //       );
  //     }
  //   };

  //   fetchUserDetails();
  // }, [token, user]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMenu = (key: string) => {
    if (key === "account") {
      navigate("/Home/Profile");
    } else if (key === "logout") {
      navigate("/");
      logout();
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "account",
      label: "Thông tin tài khoản",
      icon: <UserOutlined />,
    },
    {
      key: "logout",
      label: <span style={{ color: "red" }}>Đăng xuất</span>,
      icon: <LogoutOutlined />,
    },
  ];

  const items2 = [
    {
      key: PagePath.HOME,
      icon: <HomeOutlined />,
      label: <Link to={PagePath.HOME}>Trang chủ</Link>,
    },
    ...(user?.role === RoleCode.ADMIN
      ? [
          {
            key: PagePath.USER_MANAGEMENT,
            icon: <UserOutlined />,
            label: (
              <Link to={PagePath.USER_MANAGEMENT}>Quản lý người dùng</Link>
            ),
          },
        ]
      : []),
    ...(user?.role === RoleCode.ADMIN
      ? [
          {
            key: PagePath.SERVICE_MANAGEMENT,
            icon: <CustomerServiceOutlined />,
            label: (
              <Link to={PagePath.SERVICE_MANAGEMENT}>Quản lý dịch vụ</Link>
            ),
          },
        ]
      : []),
    ...(user?.role === RoleCode.ADMIN
      ? [
          {
            key: PagePath.SKIN_TYPE_MANAGEMENT,
            icon: <SkinOutlined />,
            label: (
              <Link to={PagePath.SKIN_TYPE_MANAGEMENT}>Quản lý loại da</Link>
            ),
          },
        ]
      : []),
    ...(user?.role === RoleCode.ADMIN || user?.role === RoleCode.STAFF
      ? [
          {
            key: PagePath.SLOT_MANAGEMENT,
            icon: <HourglassOutlined />,
            label: <Link to={PagePath.SLOT_MANAGEMENT}>Quản lý slot</Link>,
          },
        ]
      : []),
    ...(user?.role === RoleCode.ADMIN
      ? [
          {
            key: PagePath.BLOG_MANAGEMENT,
            icon: <BookOutlined />,
            label: <Link to={PagePath.BLOG_MANAGEMENT}>Quản lý blog</Link>,
          },
        ]
      : []),
    ...(user?.role === RoleCode.ADMIN
      ? [
          {
            key: PagePath.QUIZ_MANAGEMENT,
            icon: <QuestionOutlined />,
            label: <Link to={PagePath.QUIZ_MANAGEMENT}>Quản lý quiz</Link>,
          },
        ]
      : []),
    ...(user?.role === RoleCode.STAFF || user?.role === RoleCode.THERAPIST
      ? [
          {
            key: PagePath.BOOKING,
            icon: <CalendarOutlined />,
            label: <Link to={PagePath.BOOKING}>Lịch đặt hẹn</Link>,
          },
        ]
      : []),
    ...(user?.role === RoleCode.STAFF
      ? [
          {
            key: PagePath.SCHEDULE_FOR_STAFF_MANAGEMENT,
            icon: <ScheduleOutlined />,
            label: (
              <Link to={PagePath.SCHEDULE_FOR_STAFF_MANAGEMENT}>
                Lịch làm việc
              </Link>
            ),
          },
        ]
      : []),
    ...(user?.role === RoleCode.THERAPIST
      ? [
          {
            key: PagePath.SCHEDULE_FOR_THERAPIST,
            icon: <ScheduleOutlined />,
            label: (
              <Link to={PagePath.SCHEDULE_FOR_THERAPIST}>Lịch làm việc</Link>
            ),
          },
        ]
      : []),
    ...(user?.role === RoleCode.STAFF
      ? [
          {
            key: PagePath.THERAPIST_MANAGEMENT,
            icon: <UserOutlined />,
            label: (
              <Link to={PagePath.THERAPIST_MANAGEMENT}>
                Quản lý chuyên viên
              </Link>
            ),
          },
        ]
      : []),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          backgroundColor: "rgb(242 245 248 / 1)",
          marginTop: "64px",
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={items2}
          className="bg-light-109"
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            borderBottom: "1px solid #EBEFF5",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              border: "none",
              outline: "none",
            }}
          />

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            {/* <Popover
              content={notificationContent}
              trigger="hover"
              placement="bottomRight"
            >
              <BellFilled
                style={{
                  fontSize: "25px",
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              />
            </Popover> */}

            <Dropdown menu={{ items, onClick: ({ key }) => handleMenu(key) }}>
              <span
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    therapist?.image ||
                    "https://joesch.moe/api/v1/male/random?key=1"
                  }
                  style={{
                    marginRight: "10px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid #1890ff",
                    objectFit: "cover",
                  }}
                  alt="User Avatar"
                />
                {user?.username || "User"}
              </span>
            </Dropdown>
          </div>
        </Header>

        <Layout
          style={{
            padding: "64px 24px 24px",
            backgroundColor: "#FFF",
          }}
          className={"home-background"}
        >
          <Breadcrumb
            style={{
              margin: "6px 0",
            }}
          ></Breadcrumb>
          <Content
            style={{
              padding: "0 24",
              margin: 0,
              minHeight: 280,
              borderRadius: "8px",
              background: "transparent",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="Quy định nhập liệu"
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p></p>
      </Modal>
    </Layout>
  );
};

export default SidebarMenu;
