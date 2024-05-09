import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  Typography,
} from "antd";
import React from "react";
import {
  Link,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { customizeRequiredMark } from "../../../../components/reuse/CustomRequire";

function SignInPage() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData();

  const onFinish = (values) => {
    message.success("Đăng ký thành công!");
  };

  return (
    <div className="welcome-page">
      <Card
        style={{
          maxWidth: 500,
          width: 500,
          padding: 0,
        }}
      >
        <Flex vertical align="center">
          <Typography.Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            Đăng ký
          </Typography.Text>
          <Form
            style={{
              width: "100%",
            }}
            colon={false}
            onFinish={onFinish}
            id="DangKy"
            requiredMark={customizeRequiredMark}
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="Email"
                  rules={[
                    {
                      type: "email",
                      message: "Email không hợp lệ!",
                    },
                    {
                      required: true,
                      message: "Vui lòng nhập Email!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input></Input>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Mật khẩu"
                  name="MatKhau"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Mật khẩu!",
                    },
                    {
                      min: 6,
                      message: "Mật khẩu phải có tối thiếu 6 ký tự!",
                    },
                    {
                      max: 20,
                      message: "Mật khẩu chỉ có 20 ký tự tối đa!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password></Input.Password>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="ConfirmMatKhau"
                  label="Nhập lại mật khẩu"
                  dependencies={["MatKhau"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Mật khẩu!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("MatKhau") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Mật khẩu và Nhập lại mật khẩu không khớp nhau!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Flex
              align="center"
              justify="center"
              gap={10}
              style={{
                marginTop: 10,
              }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  style={{
                    fontWeight: 600,
                    backgroundColor: "#2B86C5",
                  }}
                  htmlType="submit"
                >
                  Đăng ký
                </Button>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  <Link to="/login">Đăng nhập</Link>
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Flex>
      </Card>
      {/* <Outlet /> */}
    </div>
  );
}

export default SignInPage;
