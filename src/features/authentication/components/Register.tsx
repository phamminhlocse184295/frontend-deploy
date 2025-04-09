import { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../hooks/useAuthStore";
import "../../../style/App.css";
import { useNavigate } from "react-router-dom";
import { LoginDto } from "../dto/login.dto";
import { PagePath } from "../../../enums/page-path.enum";

const Register = () => {
  const [form] = Form.useForm();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation<
    { success: boolean; message: string },
    unknown,
    LoginDto
  >({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.success) {
        navigate(PagePath.HOME);
        message.success("Đăng nhập thành công");
      } else {
        message.error(response.message);
      }
    },
    onError: (error) => {
      message.error("Login failed: " + (error as Error).message);
    },
  });

  const onFinish = (values: LoginDto) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    document.title = "Đăng ký";
  }, []);

  return (
    <div>
      <img
        // src="https://dev.ddc.fis.vn/econstruction_web_client/assets/logo-ctc-horizontal-BCKyPDAh.png"
        src="https://cdn.fpt-is.com/vi/FPT-IS-set-logo-08-1715516291.svg"
        style={{ width: "200px" }}
      />
      <h2 style={{ fontWeight: 700, fontSize: "30px", margin: 0 }}>
        eConstruction
      </h2>
      <p style={{ marginTop: 0 }}>Đăng ký</p>
      <div className="form-container">
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          initialValues={{
            username: "ADMIN@GMAIL.COM",
            password: "admin",
          }}
        >
          <Form.Item
            name="username"
            label="Tài khoản"
            rules={[{ required: true, message: "Nhập tài khoản" }]}
          >
            <Input allowClear placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Họ & Tên"
            rules={[{ required: true, message: "Nhập họ & tên" }]}
          >
            <Input allowClear placeholder="fullName" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Nhập mật khẩu" }]}
          >
            <Input.Password
              placeholder="input password"
              allowClear
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Nhập lại mật khẩu"
            rules={[{ required: true, message: "Nhập lại mật khẩu" }]}
          >
            <Input.Password
              placeholder="confirm password"
              allowClear
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button className="login-btn" type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
