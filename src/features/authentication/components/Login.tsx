/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message, Tabs } from "antd";
import {
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { LoginDto } from "../dto/login.dto";
import { useRegister } from "../hooks/useRegister";
import { PagePath } from "../../../enums/page-path.enum";
import { RoleCode } from "../../../enums/role.enum";
import "../../../style/Login.css";
import { useState } from "react";

const { TabPane } = Tabs;

const LoginRegister = () => {
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { mutate: createAccount } = useRegister();

  const loginMutation = useMutation<
    { success: boolean; message: string; role: string },
    unknown,
    LoginDto
  >({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.success) {
        if (
          response.role === RoleCode.ADMIN ||
          response.role === RoleCode.STAFF ||
          response.role === RoleCode.THERAPIST
        ) {
          navigate(PagePath.HOME);
        } else {
          navigate(PagePath.HOME_PAGE);
        }
        message.success("Đăng nhập thành công");
      } else {
        message.error(response.message);
      }
    },
    onError: (error) => {
      message.error("Login failed: " + (error as Error).message);
    },
  });

  const handleCreateAccount = () => {
    registerForm
      .validateFields()
      .then((values) => {
        createAccount(values, {
          onSuccess: () => {
            message.success("Tạo tài khoản thành công! Hãy đăng nhập.");
            setTimeout(() => {
              setActiveTab("1");
              registerForm.resetFields();
            }, 100);
          },
          onError: (err: { message: any }) => {
            message.error(`Lỗi tạo tài khoản: ${err.message}`);
          },
        });
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const onFinish = (values: any) => {
    if (activeTab === "1") {
      loginMutation.mutate(values);
    } else if (activeTab === "2") {
      handleCreateAccount();
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img
            src="https://i.pinimg.com/736x/58/43/3f/58433f4c85f2c63027ec5bf84bbda38f.jpg"
            alt="Logo"
          />
        </div>

        <div className="login-form">
          <h2 className="login-title">Dịch vụ chăm sóc da</h2>
          <Tabs
            activeKey={activeTab}
            defaultActiveKey="1"
            centered
            onChange={(key) => setActiveTab(key)}
          >
            <TabPane tab="Đăng nhập" key="1">
              <Form form={loginForm} name="login" onFinish={onFinish}>
                <Form.Item
                  name="accountName"
                  label="Tài khoản"
                  rules={[{ required: true, message: "Nhập tài khoản" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Tài khoản"
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[{ required: true, message: "Nhập mật khẩu" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mật khẩu"
                    allowClear
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item className="forgot-password">
                  <Button
                    type="link"
                    onClick={() => navigate(PagePath.VERIFY_EMAIL)}
                  >
                    Quên mật khẩu?
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submit-btn"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Đăng ký" key="2">
              <Form
                form={registerForm}
                name="register"
                onFinish={onFinish}
                onFinishFailed={(errorInfo) => {
                  console.error(
                    "❌ Form submission failed. Errors:",
                    errorInfo
                  );
                  message.error("Đăng ký thất bại ! Hãy thử lại ");
                }}
              >
                <Form.Item
                  name="accountName"
                  label="Tài khoản"
                  rules={[{ required: true, message: "Nhập tài khoản" }]}
                >
                  <Input placeholder="Tài khoản" allowClear />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                      message: "Email không hợp lệ",
                    },
                    {
                      required: true,
                      message: "Nhập email",
                    },
                  ]}
                >
                  <Input placeholder="Email" allowClear />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    { required: true, message: "Nhập mật khẩu" },
                    { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
                  ]}
                >
                  <Input.Password
                    placeholder="Mật khẩu"
                    allowClear
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Nhập lại mật khẩu"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Nhập lại mật khẩu" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu không khớp!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Nhập lại mật khẩu"
                    allowClear
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submit-btn"
                  >
                    Đăng ký
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
