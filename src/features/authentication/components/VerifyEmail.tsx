import { Button, Form, Input, message } from "antd";
import "../../../style/App.css";
import { useNavigate } from "react-router-dom";
import { PagePath } from "../../../enums/page-path.enum";
import { useForgotPassword } from "../hooks/useForgotPassword";

const VerifyEmail = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: forgotPassword } = useForgotPassword();

  const handleVerifyAccount = () => {
    form
      .validateFields()
      .then((values) => {
        localStorage.setItem("email", values.email);
        forgotPassword(values, {
          onSuccess: () => {
            message.success("OTP đã được gửi đến email của bạn!");
            navigate(PagePath.VERIFY_OTP, { state: { email: values.email } });
          },
          onError: (error: Error) => {
            message.error("Gửi OTP thất bại: " + (error as Error).message);
          },
        });
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  return (
    <div>
      {/* <img
        src="https://cdn.fpt-is.com/vi/FPT-IS-set-logo-08-1715516291.svg"
        style={{ width: "200px" }}
      /> */}
      <h2 style={{ fontWeight: 700, fontSize: "30px", margin: 0 }}>Skincare</h2>
      <p style={{ marginTop: 0 }}>Xác thực email</p>
      <div className="form-container">
        <Form form={form} name="control-hooks" onFinish={handleVerifyAccount}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Nhập email" }]}
          >
            <Input allowClear placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-btn">
              Xác thực email
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail;
