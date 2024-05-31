import { Button, Card, Flex, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../components/layout/header/Logo";
import "../Welcome/Welcome.scss";

const Welcome = () => {
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
          <Flex
            align="center"
            gap={10}
            style={{
              margin: 10,
            }}
          >
            <Logo />
            <div className="logo-title">CustomerCare</div>
          </Flex>
          <Typography.Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Quý khách vui lòng đăng nhập/đăng ký để sử dụng.
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
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default Welcome;
