import useAuthStore from "../hooks/useAuthStore";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import useUpdatePassword from "@/features/auth/hooks/useUpdatePassword";
import { Form, Button, Flex, Col, Input } from "antd";

export default function ProfileChangePassword() {
  const [form] = Form.useForm();

  const { user } = useAuthStore();
  // const { mutate: mutateUpdatePassword } = useUpdatePassword({
  //   onSuccess: () => {
  //     form.resetFields();
  //   },
  // });

  const handleOnOk = async () => {
    try {
      await form.validateFields();
      // const { oldPassword, newPassword } = form.getFieldsValue();

      if (user?.username) {
        // mutateUpdatePassword({
        //   username: user?.username,
        //   currentPassword: oldPassword,
        //   newPassword: newPassword,
        // });
      }
    } catch (error) {
      console.log(error, "err");
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" autoComplete="new-password">
        <Col className="mb-4" style={{ width: "-webkit-fill-available" }}>
          <Form.Item
            name="oldPassword"
            label="Mật khẩu cũ"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu cũ"
              allowClear
              autoComplete="off"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Col>
        <Col className="mb-6" style={{ width: "-webkit-fill-available" }}>
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              allowClear
              autoComplete="off"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Col>
        <Col className="mb-6" style={{ width: "-webkit-fill-available" }}>
          <Form.Item
            name="repeatNewPassword"
            label="Nhập lại mật khẩu mới"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu mới!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu mới không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Nhập lại mật khẩu mới"
              allowClear
              autoComplete="off"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Col>
      </Form>
      <div className="absolute bottom-4 left-0 right-0 px-6">
        <Flex
          className="w-full justify-between gap-4"
          style={{ justifyContent: "space-between" }}
        >
          <Button
            className="border-none bg-light-f2f5f8"
            onClick={() => {
              form.resetFields();
            }}
          >
            Hủy
          </Button>
          <Button type="primary" onClick={handleOnOk}>
            Lưu thay đổi
          </Button>
        </Flex>
      </div>
    </>
  );
}
