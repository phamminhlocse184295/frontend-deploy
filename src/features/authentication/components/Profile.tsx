/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomLogoutIcon from "../../../components/icon/CustomLogoutIcon";
import CustomPenIcon from "../../../components/icon/CustomPenIcon";
import { UserOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import { Button, Card, Flex, Image, Typography, Menu, Col, Spin } from "antd";
import useAuthStore from "../hooks/useAuthStore";
import ProfileChangePassword from "./ProfileChangePassword";
import ProfileInformation from "./ProfileInformation";
import CustomPasswordIcon from "../../../components/icon/CustomPasswordIcon";
import { useGetProfile } from "../hooks/useGetProfile";

const { Title } = Typography;

export default function Profile() {
  const { user, logout } = useAuthStore();
  const uploadAvatarRef = useRef<Record<string, any>>(null);
  const [selectedKeys, setSelectedKeys] = useState(["profile-information"]);

  const {
    mutate: getProfile,
    data: profileData,
    isPending,
    error,
  } = useGetProfile();

  useEffect(() => {
    if (user?.accountId && user?.role) {
      getProfile({ accountId: user.accountId, role: user.role });
    }
  }, [user, getProfile]);

  const profile = Array.isArray(profileData) ? profileData[0] : undefined;
  const skinTherapist = profile?.skinTherapists?.[0] ?? null;

  const items = [
    {
      label: "Thông tin cá nhân",
      key: "profile-information",
      icon: <UserOutlined />,
    },
    {
      label: "Đổi mật khẩu",
      key: "profile-change-password",
      icon: <CustomPasswordIcon />,
    },
    {
      label: "Đăng xuất",
      key: "profile-logout",
      icon: <CustomLogoutIcon />,
      onClick: () => {
        logout();
      },
    },
  ];

  if (isPending) {
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );
  }

  if (error) {
    return <p className="text-red-500">Lỗi: {error.message}</p>;
  }

  return (
    <Flex className="gap-8">
      <Flex className="h-fit flex-[3]">
        <Card className="w-80 bg-light-f9fafb">
          <Flex className="flex-col gap-4">
            <Flex className="gap-4">
              <div>
                <div className="relative">
                  <Image
                    className="rounded-full"
                    src={
                      skinTherapist?.image ||
                      "https://joesch.moe/api/v1/male/random?key=1"
                    }
                    style={{ width: 250 }}
                  />
                  <Button
                    icon={<CustomPenIcon />}
                    shape="circle"
                    className="absolute -bottom-1 -right-1 h-6 w-6 min-w-0 p-0"
                    onClick={() => {
                      uploadAvatarRef.current?.open();
                    }}
                  />
                </div>
              </div>
            </Flex>
            <Menu
              mode="inline"
              className="bg-transparent"
              items={items}
              selectedKeys={selectedKeys}
              onClick={({ key }) => setSelectedKeys([key])}
            />
          </Flex>
        </Card>
      </Flex>
      <Flex
        className="w-full flex-col gap-4 flex-[2]"
        style={{ padding: "0 24px", width: "-webkit-fill-available" }}
      >
        {selectedKeys.includes("profile-information") && (
          <Col className="w-full gap-4">
            <Title className="text-xl font-semibold my-0" level={3}>
              Thông tin cá nhân
            </Title>
            <ProfileInformation />
          </Col>
        )}
        {selectedKeys.includes("profile-change-password") && (
          <Col
            className="w-full gap-4"
            style={{ width: "-webkit-fill-available" }}
          >
            <Title className="text-xl font-semibold my-0" level={3}>
              Đổi mật khẩu
            </Title>
            <ProfileChangePassword />
          </Col>
        )}
      </Flex>
    </Flex>
  );
}
