import { Button, Card, Flex, Typography } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Welcome/Welcome.scss";

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="welcome-page">
      <Card
        style={{
          maxWidth: 500,
        }}
      >
        <Flex vertical align="center">
          <Typography.Text
            style={{
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Chào mừng quý khách đến với hệ thống
          </Typography.Text>
          <Typography.Text className="logo">PA</Typography.Text>
          <Typography.Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Quý khách vui lòng đăng nhập/đăng ký để sử dụng các chức năng/dịch
            vụ của chúng tôi.
          </Typography.Text>
          <Flex
            align="center"
            justify="center"
            gap={10}
            style={{
              marginTop: 20,
            }}
          >
            <Button
              type="primary"
              style={{
                fontWeight: 600,
              }}
              // onClick={handleLogin}
            >
              <Link to="/login">Đăng nhập</Link>
            </Button>
            {/* <Button
              type="primary"
              style={{
                fontWeight: 600,
                backgroundColor: "#2B86C5",
              }}
            >
              <Link to="/signin">Đăng ký</Link>
            </Button> */}
          </Flex>
        </Flex>
      </Card>
      {/* <Outlet /> */}
    </div>
  );
};

export default Welcome;
