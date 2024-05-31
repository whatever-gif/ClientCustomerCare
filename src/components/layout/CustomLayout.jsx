// Import các icon từ thư viện ant-design
import {
  BellOutlined,
  LogoutOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
// Import các component từ thư viện antd
import { Avatar, Button, Dropdown, Flex, Typography } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import React, { useRef } from "react";
// Import các hook từ thư viện react-router-dom
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
// Import hook useAuthInfo từ thư mục auth
import { useAuthInfo } from "../auth/useAuthInfo";
// Import file css
import "../layout/CustomLayout.scss";
// Import component PopupNguoiDung từ thư mục popup
import PopupNguoiDung from "../popup/PopupNguoiDung";
// Import component Logo từ thư mục header
import Logo from "./header/Logo";

// Component CustomLayout
const CustomLayout = () => {
  // Tạo ref cho PopupNguoiDung
  const popupNguoiDungRef = useRef();

  // Lấy thông tin người dùng hiện tại từ hook useAuthInfo
  const { currentUser } = useAuthInfo();

  // Sử dụng hook useSubmit
  const submit = useSubmit();

  // Sử dụng hook useNavigate để điều hướng trang
  const navigate = useNavigate();

  // Sử dụng hook useLocation để lấy thông tin vị trí hiện tại
  const location = useLocation();
  // Kiểm tra xem đường dẫn hiện tại có phải là /dashboard không
  const isDashboardWithoutArgs = location.pathname === "/dashboard";

  // Hàm xử lý khi người dùng nhấn logout
  const handleLogout = () => {
    submit(null, { method: "POST", action: "/logout" });
  };

  // Định nghĩa style cho header
  const headerStyle = {
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#03884A",
    display: "flex",
    alignItems: "center",
  };

  // Định nghĩa danh sách admin
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

  // Định nghĩa danh sách menu
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

  // Hàm mở PopupNguoiDung
  const openPopupNguoiDung = () => {
    popupNguoiDungRef.current?.show();
  };

  // Định nghĩa danh sách dropdown
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

  // Hàm điều hướng về trang chủ
  const handleGoHome = () => {
    navigate("/dashboard");
  };



  // Trả về JSX
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
      <div className={`main-content ${isDashboardWithoutArgs && "dashboard"} `}>
        <Outlet />
      </div>

      <PopupNguoiDung ref={popupNguoiDungRef} />
    </Layout>
  );
};

// Xuất component CustomLayout
export default CustomLayout;