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
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmPopup from "../../../../components/popup/ConfirmPopup";
import { useApiService } from "../../../../components/service/useApiService";
import "./components/ChiTietKhachHang.scss";
import ChiTietTab from "./components/Tabs/ChiTietTab";
import EticketTab from "./components/Tabs/EticketTab";

const ChiTietKhachHang = () => {
  const navigate = useNavigate();

  const popupRef = useRef();

  const { MaKhachHang } = useParams();

  const api = useApiService();

  const handleBack = () => {
    navigate("/dashboard/khachhang");
  };

  const handleUpdate = () => {
    navigate(`/dashboard/khachhang/update/${MaKhachHang}`);
  };

  const handleDelete = async () => {
    await Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa khách hàng này không?",
      onOk: async () => {
        // const resp = await api.deleteKhachHang({
        //   MaKhachHang: MaKhachHang,
        // });
        // if (resp.Success) {
        //   message.success("Xóa khách hàng thành công");
        //   navigate("/dashboard/khachhang");
        // } else {
        //   if (resp.Error) {
        //     message.error(resp.Error);
        //   } else {
        //     message.error("Có lỗi xảy ra");
        //   }
        // }
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
    queryKey: ["getAllThongTinKhachHang", MaKhachHang],
    queryFn: async () => {
      const resp = await api.getAllInfoKhachHang({
        MaKhachHang: MaKhachHang,
      });

      if (resp.Success) {
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

      <ConfirmPopup ref={popupRef} />
    </div>
  );
};

export default ChiTietKhachHang;
