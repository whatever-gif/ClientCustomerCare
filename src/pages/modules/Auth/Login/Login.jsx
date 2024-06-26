// Import các component cần thiết từ thư viện antd, react và react-router-dom
import { Button, Card, Col, Flex, Form, Input, Row, Typography } from "antd";
import React from "react";
import { useSubmit } from "react-router-dom";
import { customizeRequiredMark } from "../../../../components/reuse/CustomRequire";
import "./login.scss" // Import file CSS cho trang login

// Khai báo component LoginPage
function LoginPage() {
  // Sử dụng hook useSubmit từ react-router-dom
  const submit = useSubmit();

  // Khai báo hàm onFinish, sẽ được gọi khi form được submit
  const onFinish = async (data) => {
    // Gửi dữ liệu form đến server bằng phương thức POST tại đường dẫn /login
    submit(data, { method: "POST", action: "/login" });
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
            Đăng nhập
          </Typography.Text>
          <Form
            style={{
              width: "100%",
            }}
            colon={false}
            onFinish={onFinish}
            id="DangNhap"
            requiredMark={customizeRequiredMark}
            initialValues={{
              Email: null,
              MatKhau: null,
            }}
            autoComplete="off"
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
                  }}
                  htmlType="submit"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Flex>
      </Card>
    </div>
  );
}

export default LoginPage;
