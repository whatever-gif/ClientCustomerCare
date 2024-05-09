import {
  BellOutlined,
  LogoutOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import React, { useRef } from "react";
import { NavLink, Outlet, useNavigate, useSubmit } from "react-router-dom";
import "../layout/CustomLayout.scss";
import PopupNguoiDung from "../popup/PopupNguoiDung";

const CustomLayout = () => {
  const popupNguoiDungRef = useRef();

  const submit = useSubmit();

  const navigate = useNavigate();

  const handleLogout = () => {
    submit(null, { method: "POST", action: "/logout" });
  };

  const headerStyle = {
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#03884A",
    display: "flex",
    alignItems: "center",
  };

  const listAdmin = [
    {
      key: "1",
      label: (
        <NavLink
          to={"/dashboard/quantri/user"}
          key={1}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Quản lý người dùng{" "}
        </NavLink>
      ),
      link: "/dashboard/quantri/user",
    },
    {
      key: "2",
      label: (
        <NavLink
          to={"/dashboard/quantri/role"}
          key={1}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Phân quyền{" "}
        </NavLink>
      ),
      link: "/dashboard/quantri/role",
    },
  ];

  const listMenu = [
    {
      key: "1",
      label: "Khách hàng",
      link: "/dashboard/khachhang",
    },
    {
      key: "2",
      label: "eTicket",
      link: "/dashboard/eticket",
    },
    {
      key: "3",
      label: "Báo cáo",
      link: "/dashboard/baocao",
    },
    {
      key: "4",
      link: "/dashboard/quantri",
      label: (
        <Dropdown menu={{ items: listAdmin }} trigger={["click"]}>
          <div className="nav-item">Quản trị</div>
        </Dropdown>
      ),
    },
  ];

  const openPopupNguoiDung = () => {
    popupNguoiDungRef.current?.show();
  };

  const listDrop = [
    {
      label: (
        <Flex align="center" gap={10} onClick={openPopupNguoiDung}>
          <div>Thông tin</div>
          <UserOutlined />
        </Flex>
      ),
      key: "1",
    },
    {
      label: (
        <Flex align="center" gap={10}>
          <div onClick={handleLogout}>Đăng xuất</div>
          <LogoutOutlined />
        </Flex>
      ),
      key: "2",
    },
  ];

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  const handleChangeNav = (id) => {
    const result = listMenu.find((item) => item.key == id);

    if (result && result.link) {
      navigate(result.link);
    }
  };

  return (
    <Layout className="custom-layout">
      <Header className="custom-header" style={headerStyle}>
        <div
          style={{ marginRight: 30, fontSize: 20, cursor: "pointer" }}
          className="logo"
          onClick={handleGoHome}
        >
          PA
        </div>
        <Flex
          justify="space-between"
          style={{
            width: "100%",
          }}
        >
          {/* <Tabs
            items={listMenu}
            className="header-nav"
            onChange={handleChangeNav}
          /> */}
          <Flex gap={10} className="header-nav">
            {listMenu.map((item) => {
              if (item.key == "4") {
                <NavLink
                  key={item.key}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  {item.label}
                </NavLink>;
              }
              return (
                <NavLink
                  to={item.link}
                  key={item.key}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </Flex>
          <Flex align="center" gap={10}>
            <Button icon={<WechatOutlined />}></Button>
            <Button icon={<BellOutlined />}></Button>
            <Dropdown menu={{ items: listDrop }} trigger={["click"]}>
              <Avatar size={32} icon={<UserOutlined />} />
            </Dropdown>
          </Flex>
        </Flex>
      </Header>
      <div className="main-content">
        <Outlet />
      </div>

      <PopupNguoiDung ref={popupNguoiDungRef} />
    </Layout>
  );
};

export default CustomLayout;
