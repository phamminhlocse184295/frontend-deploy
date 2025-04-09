import useAuthStore from "../hooks/useAuthStore";
import { Form, Spin, Typography } from "antd";
import { useGetProfile } from "../hooks/useGetProfile";
import { useEffect } from "react";
import { RoleCode } from "../../../enums/role.enum";

const { Text } = Typography;

export default function ProfileInformation() {
  const [form] = Form.useForm();
  const { user } = useAuthStore();
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
    <Form form={form} initialValues={{}}>
      <Form.Item label={"Họ & Tên"}>
        <Text className=" font-medium">
          {" "}
          {skinTherapist?.name || profile?.accountName || "Không có thông tin"}
        </Text>
      </Form.Item>
      {user?.role === RoleCode.THERAPIST && (
        <>
          <Form.Item label={"Số điện thoại"}>
            <Text className=" font-medium">
              {" "}
              {/* {skinTherapist?.phoneNumber || "Không có thông tin"} */}
            </Text>
          </Form.Item>
          <Form.Item label={"Email"}>
            <Text className=" font-medium">{skinTherapist?.email}</Text>
          </Form.Item>
          <Form.Item label={"Kỹ năng"}>
            <Text className=" font-medium">{skinTherapist?.speciality}</Text>
          </Form.Item>
          <Form.Item label={"Bằng cấp"}>
            <Text className=" font-medium">{skinTherapist?.degree}</Text>
          </Form.Item>
        </>
      )}
    </Form>
  );
}
