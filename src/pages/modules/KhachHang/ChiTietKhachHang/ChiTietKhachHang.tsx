import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Flex,
  message,
  Modal,
  Row,
  Tabs,
  Typography,
} from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiService } from "../../../../components/service/useApiService";
import "./components/ChiTietKhachHang.scss";
import ChiTietTab from "./components/Tabs/ChiTietTab";
import EticketTab from "./components/Tabs/EticketTab";

const ChiTietKhachHang = () => {
  const navigate = useNavigate();

  const { MaKhachHang } = useParams(); // lấy mã khách hàng từ url

  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  const handleBack = () => {
    // Hàm quay lại trang quản lý khách hàng
    navigate("/dashboard/khachhang"); // Chuyển hướng đến trang quản lý khách hàng
  };

  const handleUpdate = () => {
    // Hàm chuyển hướng đến trang chỉnh sửa thông tin khách hàng
    navigate(`/dashboard/khachhang/update/${MaKhachHang}`); // Chuyển hướng đến trang chỉnh sửa thông tin khách hàng
  };

  const handleDelete = async () => {
    // Hàm xóa khách hàng
    await Modal.confirm({
      // Hiển thị modal xác nhận xóa
      title: "Xác nhận xóa", // Tiêu đề modal
      content: "Bạn có chắc chắn muốn xóa khách hàng này không?", // Nội dung modal
      onOk: async () => {
        // Hàm xác nhận xóa
        const resp = await api.deleteKhachHang({
          // Gọi api xóa khách hàng
          MaKhachHang: MaKhachHang, // Truyền mã khách hàng cần xóa
        });
        if (resp.Success) {
          // Nếu xóa thành công
          message.success("Xóa khách hàng thành công!"); // Hiển thị thông báo xóa thành công
          handleBack(); // Quay lại trang quản lý khách hàng
        } else {
          if (resp.Error) {
            message.error(resp.Error);
          } else {
            message.error("Có lỗi xảy ra");
          }
        }
      },
      okButtonProps: {
        style: {
          backgroundColor: "#03884A",
        },
        type: "primary",
      },
      okText: "Đồng ý",
      cancelText: "Hủy",
    });
  };

  const { data } = useQuery({
    // Sử dụng hook useQuery để lấy dữ liệu thông tin khách hàng
    queryKey: ["getAllThongTinKhachHang", MaKhachHang], // Truyền key và mã khách hàng
    queryFn: async () => {
      // Hàm gọi api lấy thông tin khách hàng
      const resp = await api.getAllInfoKhachHang({
        // Gọi api lấy thông tin khách hàng
        MaKhachHang: MaKhachHang, // Truyền mã khách hàng
      });

      if (resp.Success) {
        // Nếu lấy dữ liệu thành công
        return {
          Info: resp.Data.KhachHang,
          Ticket: resp.Data.Ticket,
        };
      } else {
        if (resp.Error) {
          message.error(resp.Error);
        } else {
          message.error("Có lỗi xảy ra");
        }

        return {
          Info: {},
          Ticket: [],
        };
      }
    },
  });

  return (
    <div>
      <Row
        gutter={24}
        className="custom-header"
        style={{
          marginTop: 10,
        }}
      >
        <Col span={12} className="custom-header-breadcrumb">
          <Breadcrumb
            items={[
              {
                title: (
                  <>
                    <span
                      style={{
                        color: "#03884a",
                        cursor: "pointer",
                      }}
                      onClick={handleBack}
                    >
                      Quản lý khách hàng
                    </span>
                  </>
                ),
              },
              {
                title: "Chi tiết khách hàng",
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <Flex gap={10} justify="end">
            <Button type="primary" onClick={handleUpdate}>
              Chỉnh sửa
            </Button>
            <Button type="primary" danger onClick={handleDelete}>
              Xóa
            </Button>
          </Flex>
        </Col>
      </Row>
      <Divider prefixCls="divider-custom" />
      <Row gutter={24}>
        <Col span={4}></Col>

        <Col span={3}>
          {data?.Info.AnhDaiDien ? (
            <Avatar size={100} src={data?.Info.AnhDaiDien}></Avatar>
          ) : (
            <Avatar size={100}>{data?.Info.TenKhachHang[0]}</Avatar>
          )}
        </Col>
        <Col span={6}>
          <Flex
            vertical
            gap={20}
            style={{
              height: "100%",
            }}
            justify="center"
          >
            <Flex gap={10}>
              <Typography>Mã khách hàng:</Typography>
              <Typography.Text strong>{data?.Info.MaKhachHang}</Typography.Text>
            </Flex>
            <Flex gap={10}>
              <Typography>Tên khách hàng:</Typography>
              <Typography.Text strong>
                {data?.Info.TenKhachHang}
              </Typography.Text>
            </Flex>
          </Flex>
        </Col>
        <Col span={6}>
          <Flex
            vertical
            gap={20}
            style={{
              height: "100%",
            }}
            justify="center"
          >
            <Flex gap={10}>
              <Typography>Điện thoại:</Typography>
              <Typography.Text strong>{data?.Info.SoDienThoai}</Typography.Text>
            </Flex>
            <Flex gap={10}>
              <Typography>Email:</Typography>
              <Typography.Text strong>{data?.Info.Email}</Typography.Text>
            </Flex>
          </Flex>
        </Col>

        <Col span={4}></Col>
      </Row>
      <Divider prefixCls="divider-custom" />
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"middle"}
        items={[
          {
            label: `eTicket`,
            key: "1",
            children: (
              <EticketTab data={data && data.Ticket ? data.Ticket : []} />
            ),
          },
          {
            label: `Chi tiết khách hàng`,
            key: "2",
            children: <ChiTietTab data={data && data.Info ? data.Info : {}} />,
          },
        ]}
      />
    </div>
  );
};

export default ChiTietKhachHang;
