import { MoreOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Dropdown,
  Flex,
  message,
  Modal,
  Row,
  Tag,
  Typography,
} from "antd";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthInfo } from "../../../../../components/auth/useAuthInfo";
import CountTime from "../../../../../components/reuse/CountTime";
import { renderTagColor } from "../../../../../components/reuse/RenderTagColor";
import { useApiService } from "../../../../../components/service/useApiService";
import "./components/ChiTietEticket.scss";
import ChiTiet from "./components/Tabs/ChiTiet";
import QuaTrinhXuLy from "./components/Tabs/QuaTrinhXuLy";

const ChiTietEticket = () => {
  const listDropdown = [
    {
      label: "Xóa",
      key: "0",
    },
    {
      label: "Đang xử lý",
      key: "1",
    },
    {
      label: "Đóng",
      key: "2",
    },
    {
      label: "Hoàn thành",
      key: "3",
    },
  ];

  const navigate = useNavigate();

  const quaTrinhXuLyRef = useRef();

  const api = useApiService();

  const { currentUser } = useAuthInfo();

  const { MaTicket } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["getAllThongTinKhachHang", MaTicket],
    queryFn: async () => {
      const resp = await api.getByMaTicket({
        MaTicket: MaTicket,
      });

      if (resp.Success) {
        quaTrinhXuLyRef.current.setList(resp.Data.ListQuaTrinhXuLy);

        return {
          Info: { ...resp.Data.Eticket, ...resp.Data.KhachHang },
          ListQTXL: resp.Data.ListQuaTrinhXuLy,
        };
      } else {
        if (resp.Error) {
          message.error(resp.Error);
        } else {
          message.error("Có lỗi xảy ra");
        }

        return {
          Info: {},
          ListQTXL: [],
        };
      }
    },
    refetchOnWindowFocus: false,
  });

  const filteredListDropdown = (status) => {
    return listDropdown.filter((item) => {
      // if (status === "Open") {
      //   return item.key !== "0";
      // }

      if (status === "Processing") {
        return item.key !== "1";
      }

      if (status === "Closed") {
        return item.key === "0";
      }

      if (status === "Solved") {
        return item.key === "0";
      }

      return item;
    });
  };

  const status = renderTagColor({
    renderedCellValue: data?.Info.MaTrangThaiTicket,
  });

  const handleBack = () => {
    navigate("/dashboard/eticket");
  };

  const handleEdit = () => {
    navigate(`/dashboard/eticket/update/${MaTicket}`);
  };

  const content = ({ currentStatus, newStatus }) => {
    return (
      <div>
        Bạn có muốn chuyển từ trạng thái của ticket từ{" "}
        {renderTagColor({
          renderedCellValue: currentStatus,
        })}{" "}
        sang{" "}
        {renderTagColor({
          renderedCellValue: newStatus,
        })}
      </div>
    );
  };

  const handleDelete = async () => {
    await Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa ticket này không?",
      onOk: async () => {
        const postRequest = {
          MaTicket: MaTicket,
          NguoiCapNhat: currentUser.Email,
        };

        const resp = await api.deleteTicket({
          strJson: JSON.stringify(postRequest),
        });
        if (resp.Success) {
          message.success("Xóa ticket thành công!", 2, () =>
            navigate("/dashboard/khachhang")
          );
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

  const handleProcess = async () => {
    await Modal.confirm({
      title: "Chuyển trạng thái",
      content: content({
        currentStatus: data?.Info.MaTrangThaiTicket,
        newStatus: "Processing",
      }),
      onOk: async () => {
        const postRequest = {
          MaTicket: MaTicket,
          MaTrangThaiTicket: "Processing",
          NguoiCapNhat: currentUser.Email,
        };

        const resp = await api.updateTrangThaiTicket({
          strJson: JSON.stringify(postRequest),
        });
        if (resp.Success) {
          message.success("Cập nhật trạng thái thành công!");
          refetch();
          // navigate("/dashboard/khachhang");
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

  const handleClose = async () => {
    await Modal.confirm({
      title: "Chuyển trạng thái",
      content: content({
        currentStatus: data?.Info.MaTrangThaiTicket,
        newStatus: "Closed",
      }),
      onOk: async () => {
        const postRequest = {
          MaTicket: MaTicket,
          MaTrangThaiTicket: "Closed",
          NguoiCapNhat: currentUser.Email,
        };

        const resp = await api.updateTrangThaiTicket({
          strJson: JSON.stringify(postRequest),
        });
        if (resp.Success) {
          message.success("Cập nhật trạng thái thành công!");
          refetch();
          // navigate("/dashboard/khachhang");
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

  const handleSolved = async () => {
    await Modal.confirm({
      title: "Chuyển trạng thái",
      content: content({
        currentStatus: data?.Info.MaTrangThaiTicket,
        newStatus: "Solved",
      }),
      onOk: async () => {
        const postRequest = {
          MaTicket: MaTicket,
          MaTrangThaiTicket: "Solved",
          NguoiCapNhat: currentUser.Email,
        };

        const resp = await api.updateTrangThaiTicket({
          strJson: JSON.stringify(postRequest),
        });
        if (resp.Success) {
          message.success("Cập nhật trạng thái thành công!");
          refetch();
          // navigate("/dashboard/khachhang");
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

  const handleClickDropdown = async (e) => {
    if (e.key == "0") {
      await handleDelete();
    }

    if (e.key == "1") {
      await handleProcess();
    }

    if (e.key == "2") {
      await handleClose();
    }

    if (e.key == "3") {
      await handleSolved();
    }
  };

  const renderTime = () => {
    if (data?.Info.FlagQuaHanXuLy == 1) {
      if (
        data?.Info.MaTrangThaiTicket == "Closed" ||
        data?.Info.MaTrangThaiTicket == "Solved"
      ) {
        return data?.Info.ThoiGianXuLy;
      } else {
        return <CountTime baseTime={data?.Info.ThoiGianXuLy} />;
      }
    } else {
      if (
        data?.Info.MaTrangThaiTicket == "Closed" ||
        data?.Info.MaTrangThaiTicket == "Solved"
      ) {
        return data?.Info.ThoiGianXuLy;
      } else {
        return <CountTime baseTime={data?.Info.ThoiGianXuLy} />;
      }
    }
  };

  console.log(data?.Info);

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
                      Eticket
                    </span>
                  </>
                ),
              },
              {
                title: "Chi tiết Eticket",
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <Flex gap={10} justify="end">
            <Button type="primary" onClick={handleEdit}>
              Chỉnh sửa
            </Button>
            <Button onClick={handleBack}>Hủy bỏ</Button>
            <Dropdown
              menu={{
                items: filteredListDropdown(data?.Info.MaTrangThaiTicket),
                onClick: handleClickDropdown,
              }}
              trigger={["click"]}
            >
              <Button icon={<MoreOutlined />}></Button>
            </Dropdown>
          </Flex>
        </Col>
      </Row>
      <Divider prefixCls="divider-custom" />
      <Flex vertical gap={10}>
        <Row gutter={24}>
          <Col span={12}>
            <Flex gap={5}>
              <Typography.Text strong>
                {data?.Info.TenTicket} - {data?.Info.MaTicket}
              </Typography.Text>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex justify="end">
              {data?.Info.FlagQuaHanXuLy == 1 && (
                <Tag color="red">Quá hạn xử lý</Tag>
              )}
            </Flex>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={1}></Col>

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
                <Typography>Tên khách hàng:</Typography>
                <Typography.Text strong>
                  {data?.Info.TenKhachHang}
                </Typography.Text>
              </Flex>
              <Flex gap={10}>
                <Typography>SĐT Khách hàng:</Typography>
                <Typography.Text strong>
                  {data?.Info.SoDienThoai}
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
                <Typography>Thời gian xử lý:</Typography>
                <Typography.Text strong>{renderTime()}</Typography.Text>
              </Flex>
              <Flex gap={10}>
                <Typography>Phân loại:</Typography>
                <Typography.Text strong>
                  {data?.Info.TenPhanLoaiTicket}
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
                <Typography>Trạng thái:</Typography>
                <Typography.Text strong>{status}</Typography.Text>
              </Flex>
              <Flex gap={10}>
                <Typography>Deadline:</Typography>
                <Typography.Text strong>
                  {data?.Info.TicketDeadline}
                </Typography.Text>
              </Flex>
            </Flex>
          </Col>
          <Col span={1}></Col>
        </Row>
      </Flex>

      <Divider prefixCls="divider-custom" />

      <Row gutter={2}>
        <Col span={17}>
          <Flex vertical gap={10}>
            <Flex justify="center" className="detail-tab">
              <Typography.Text strong>Quá trình xử lý</Typography.Text>
            </Flex>
            <QuaTrinhXuLy ref={quaTrinhXuLyRef} />
          </Flex>
        </Col>
        <Col span={7}>
          <Flex vertical>
            <Flex justify="center" className="detail-tab">
              <Typography.Text strong>Chi tiết eTicket</Typography.Text>
            </Flex>

            <ChiTiet data={data?.Info} />
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default ChiTietEticket;
