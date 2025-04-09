import { Button, Form, Input, message } from "antd";
import "../../../style/App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { PagePath } from "../../../enums/page-path.enum";
import type { GetProps } from "antd";
import { useVerifyOTP } from "../hooks/useVerifyOTP";

type OTPProps = GetProps<typeof Input.OTP>;

const VerifyOTP = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: verifyOTP } = useVerifyOTP();
  const location = useLocation();
  const storedEmail = localStorage.getItem("email");
  const email = location.state?.email || storedEmail;

  const handleFinish = (values: { otp: string }) => {
    if (!email) {
      message.error("Không tìm thấy email. Vui lòng nhập lại!");
      return;
    }

    const payload = { email, otp: values.otp };

    localStorage.setItem("otp", values.otp);

    verifyOTP(payload, {
      onSuccess: () => {
        message.success("OTP hợp lệ! Bạn có thể đặt lại mật khẩu");
        navigate(PagePath.RESET_PASSWORD, {
          state: { email, otp: values.otp },
        });
      },
      onError: (error: Error) => {
        message.error("Xác thực OTP thất bại: " + error.message);
      },
    });
  };

  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };

  const onInput: OTPProps["onInput"] = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };

  return (
    <div>
      {/* <img
        src="https://cdn.fpt-is.com/vi/FPT-IS-set-logo-08-1715516291.svg"
        style={{ width: "200px" }}
      /> */}
      <h2 style={{ fontWeight: 700, fontSize: "30px", margin: 0 }}>Skincare</h2>
      <p style={{ marginTop: 0 }}>Xác thực OTP</p>
      <div className="form-container">
        <Form form={form} name="control-hooks" onFinish={handleFinish}>
          <Form.Item
            name="otp"
            label="OTP"
            rules={[{ required: true, message: "Nhập OTP" }]}
          >
            <Input.OTP
              formatter={(str) => str.replace(/\D/g, "")}
              {...sharedProps}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-btn">
              Xác thực OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOTP;
