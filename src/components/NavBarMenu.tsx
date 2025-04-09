import { Menu, Button, Badge, Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import "../style/Navbars.css";
import { Outlet, useNavigate } from "react-router-dom";
import { PagePath } from "../enums/page-path.enum";
import { Content } from "antd/es/layout/layout";
import Footers from "./Footer";
import useAuthStore from "../features/authentication/hooks/useAuthStore";
import { useGetCustomerProfile } from "../features/authentication/hooks/useGetCustomerProfile";
import { useEffect, useState } from "react";

const NavbarMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const { data: profileData } = useGetCustomerProfile(
    user?.accountId,
    user?.role
  );

  const profile = Array.isArray(profileData) ? profileData[0] : undefined;
  const customers = profile?.customer?.[0] ?? null;

  const [selectedKey, setSelectedKey] = useState<string>(
    localStorage.getItem("selectedMenu") || "home"
  );

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    localStorage.setItem("selectedMenu", key);
    if (key === "service") {
      navigate(PagePath.SKIN_SERVICE);
    } else if (key === "blog") {
      navigate(PagePath.BLOG);
    } else if (key === "skin-therapist") {
      navigate(PagePath.SKIN_THERAPIST);
    } else if (key === "price") {
      navigate(PagePath.PRICE_SERVICE);
    } else if (key === "home") {
      navigate(PagePath.HOME_PAGE);
    } else if (key === "skin") {
      navigate(PagePath.SKIN_TYPE);
    }
  };

  useEffect(() => {
    const storedMenu = localStorage.getItem("selectedMenu");
    if (storedMenu) {
      setSelectedKey(storedMenu);
    }
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("selectedMenu");
    navigate(PagePath.ROOT);
  };

  const handleMenu = (key: string) => {
    if (key === "account") {
      navigate(PagePath.CUSTOMER_PROFILE);
    } else if (key === "logout") {
      logout();
      navigate(PagePath.LOGIN);
    }
  };

  const accountMenu = (
    <Menu onClick={({ key }) => handleMenu(key)}>
      <Menu.Item key="account" icon={<UserOutlined />}>
        Thông tin tài khoản
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => handleLogout()}
        style={{ color: "red" }}
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            className="navbar-menu"
            onClick={({ key }) => handleMenuClick(key)}
          >
            <Menu.Item key="home">Trang chủ</Menu.Item>
            <Menu.Item key="service">Dịch vụ</Menu.Item>
            <Menu.Item key="blog">Blog</Menu.Item>
            <Menu.Item key="skin-therapist">Chuyên viên trị liệu da</Menu.Item>
            <Menu.Item key="price">Bảng giá</Menu.Item>
            <Menu.Item key="skin">Loại da</Menu.Item>
          </Menu>
        </div>

        <div className="navbar-middle"></div>

        <div className="navbar-right">
          {!user ? (
            <>
              <Button type="link" onClick={() => navigate(PagePath.LOGIN)}>
                Đăng nhập
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: "8px" }}
                onClick={() => navigate(PagePath.REGISTER)}
              >
                Đăng ký
              </Button>
            </>
          ) : (
            <>
              <span style={{ marginRight: "8px", alignContent: "center" }}>
                {user.username}
              </span>
              <Dropdown overlay={accountMenu}>
                <Badge size="small">
                  {/* <UserOutlined
                    style={{ fontSize: "24px", marginLeft: "16px" }}
                  /> */}
                  <img
                    src={customers?.image}
                    style={{
                      marginRight: "10px",
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "2px solid #1890ff",
                      objectFit: "cover",
                    }}
                    alt="User Avatar"
                  />
                </Badge>
              </Dropdown>
            </>
          )}
        </div>
      </div>
      <Content
        style={{ padding: "31px 48px", background: "rgb(241, 235, 228)" }}
      >
        <Outlet />
      </Content>
      <Footers />
    </>
  );
};

export default NavbarMenu;
