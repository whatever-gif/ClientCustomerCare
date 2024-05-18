import {
  BellOutlined,
  LogoutOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Typography } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import React, { useRef } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { useAuthInfo } from "../auth/useAuthInfo";
import "../layout/CustomLayout.scss";
import PopupNguoiDung from "../popup/PopupNguoiDung";
import Logo from "./header/Logo";

const CustomLayout = () => {
  const popupNguoiDungRef = useRef();

  const { currentUser } = useAuthInfo();

  const submit = useSubmit();

  const navigate = useNavigate();

  const location = useLocation();
  const isDashboardWithoutArgs = location.pathname === "/dashboard";

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
      label: "Quản trị",
      visible: currentUser.FlagSysAdmin == "1",
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

  console.log(currentUser.Avatar);

  return (
    <Layout className="custom-layout">
      <Header className="custom-header" style={headerStyle}>
        <Flex onClick={handleGoHome} align="center" className="logo" gap={10}>
          <Logo />
          <div className="logo-title">CustomerCare</div>
        </Flex>
        <Flex
          justify="space-between"
          style={{
            width: "100%",
            paddingLeft: 50,
          }}
        >
          <Flex gap={10} className="header-nav">
            {listMenu.map((item) => {
              if (item.visible == false) {
                return <></>;
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
            <Dropdown
              menu={{ items: listDrop }}
              trigger={["click"]}
              className="cursor-pointer"
            >
              {currentUser.Avatar ? (
                <Flex align="center" gap={10}>
                  <Avatar size={32} src={currentUser.Avatar} />
                  <Typography.Text
                    strong
                    style={{
                      color: "#fff",
                    }}
                  >
                    {currentUser.TenNguoiDung}
                  </Typography.Text>
                </Flex>
              ) : (
                <Flex align="center" gap={10}>
                  <Avatar size={32} icon={<UserOutlined />} />
                  <Typography.Text
                    strong
                    style={{
                      color: "#fff",
                    }}
                  >
                    {currentUser.TenNguoiDung}
                  </Typography.Text>
                </Flex>
              )}
            </Dropdown>
          </Flex>
        </Flex>
      </Header>
      <div className={`main-content ${isDashboardWithoutArgs && "dashboard"}`}>
        <Outlet />
      </div>

      <PopupNguoiDung ref={popupNguoiDungRef} />
    </Layout>
  );
};

export default CustomLayout;
