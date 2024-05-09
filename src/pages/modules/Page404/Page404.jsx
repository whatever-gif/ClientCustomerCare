import { HomeOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Page404.scss";

const Page404 = () => {
  return (
    <div className="Page404">
      <Card>
        <Button icon={<HomeOutlined />} type="primary">
          <Link to="/dashboard">Trang chủ</Link>
        </Button>
      </Card>
    </div>
  );
};

export default Page404;
