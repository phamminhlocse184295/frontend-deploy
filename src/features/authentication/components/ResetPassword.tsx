import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "../../../style/App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { PagePath } from "../../../enums/page-path.enum";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: resetPassword } = useResetPassword();
  const storedEmail = localStorage.getItem("email");
  const email = location.state?.email || storedEmail;
  const storedOtp = localStorage.getItem("otp");
  const otp = location.state?.otp || storedOtp;

  const handleFinish = (values: { newPassword: string }) => {
    if (!email) {
      message.error("Không tìm thấy email. Vui lòng nhập lại!");
      return;
    }

    const payload = { email, otp, newPassword: values.newPassword };

    resetPassword(payload, {
      onSuccess: () => {
        message.success(
          "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập lại..."
        );
        navigate(PagePath.HOME);
      },
      onError: (error: Error) => {
        message.error("Đặt lại mật khẩu thất bại: " + (error as Error).message);
      },
    });
  };

  return (
    <div>
      {/* <img
        src="https://cdn.fpt-is.com/vi/FPT-IS-set-logo-08-1715516291.svg"
        style={{ width: "200px" }}
      /> */}
      <h2 style={{ fontWeight: 700, fontSize: "30px", margin: 0 }}>Skincare</h2>
      <p style={{ marginTop: 0 }}>Đặt lại mật khẩu</p>
      <div className="form-container">
        <Form form={form} name="control-hooks" onFinish={handleFinish}>
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[{ required: true, message: "Nhập mật khẩu mới" }]}
          >
            <Input.Password
              placeholder="input new password"
              allowClear
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            label="Nhập lại mật khẩu mới"
            rules={[
              { required: true, message: "Nhập lại mật khẩu mới" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="confirm new password"
              allowClear
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button className="login-btn" type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
