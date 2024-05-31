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
    // Khai báo mảng listDropdown cho button more
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

  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng trang

  const quaTrinhXuLyRef = useRef(); // Sử dụng hook useRef để lưu trữ danh sách quá trình xử lý

  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  const { currentUser } = useAuthInfo(); // Sử dụng hook useAuthInfo để lấy thông tin người dùng hiện tại

  const { MaTicket } = useParams(); // Lấy MaTicket từ url

  const { data, refetch } = useQuery({
    // Sử dụng hook useQuery để lấy dữ liệu từ server
    queryKey: ["getAllThongTinKhachHang", MaTicket], // Khóa duy nhất để xác định truy vấn này
    queryFn: async () => {
      // Hàm thực hiện truy vấn
      const resp = await api.getByMaTicket({
        // Gọi API để lấy dữ liệu thông tin khách hàng
        MaTicket: MaTicket,
      });

      if (
        resp.Success &&
        resp.Data &&
        resp.Data.Eticket &&
        resp.Data.KhachHang
      ) {
        // Kiểm tra nếu có dữ liệu trả về
        if (quaTrinhXuLyRef.current) {
          // Kiểm tra nếu có danh sách quá trình xử lý
          quaTrinhXuLyRef.current.setList(resp.Data.ListQuaTrinhXuLy); // Gọi hàm setList để cập nhật danh sách quá trình xử lý
        }

        return {
          Info: { ...resp.Data.Eticket, ...resp.Data.KhachHang }, // Trả về dữ liệu thông tin khách hàng
          ListQTXL: resp.Data.ListQuaTrinhXuLy, // Trả về danh sách quá trình xử lý
        };
      } else {
        if (resp.Error) {
          message.error(resp.Error);
        } else {
          message.error("Có lỗi xảy ra");
        }

        // Nếu không có dữ liệu hợp lệ
        return {
          Info: {}, // Trả về dữ liệu rỗng
          ListQTXL: [], // Trả về danh sách rỗng
        };
      }
    },
    refetchOnWindowFocus: false,
  });

  const filteredListDropdown = (status) => {
    // Hàm filteredListDropdown sẽ lọc danh sách dropdown theo trạng thái
    return listDropdown.filter((item) => {
      // if (status === "Open") {
      //   return item.key !== "0";
      // }

      if (status === "Processing") {
        // Kiểm tra nếu trạng thái là Processing
        return item.key !== "1";
      }

      if (status === "Closed") {
        // Kiểm tra nếu trạng thái là Closed
        return item.key === "0";
      }

      if (status === "Solved") {
        // Kiểm tra nếu trạng thái là Solved
        return item.key === "0";
      }

      return item;
    });
  };

  const status = renderTagColor({
    renderedCellValue: data?.Info?.MaTrangThaiTicket,
  }); // Gọi hàm renderTagColor để hiển thị trạng thái

  const handleBack = () => {
    // Hàm handleBack sẽ được gọi khi click vào nút hủy bỏ
    navigate("/dashboard/eticket"); // Điều hướng trang về trang eticket
  };

  const handleEdit = () => {
    // Hàm handleEdit sẽ được gọi khi click vào nút chỉnh sửa
    navigate(`/dashboard/eticket/update/${MaTicket}`); // Điều hướng trang đến trang chỉnh sửa eticket
  };

  const content = ({ currentStatus, newStatus }) => {
    // Hàm content sẽ trả về nội dung modal xác nhận chuyển trạng thái
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
    // Hàm handleDelete sẽ được gọi khi click vào nút xóa
    await Modal.confirm({
      // Hiển thị modal xác nhận xóa
      title: "Xác nhận xóa", // Tiêu đề modal
      content: "Bạn có chắc chắn muốn xóa ticket này không?", // Nội dung modal
      onOk: async () => {
        // Hàm onOk sẽ được gọi khi click vào nút đồng ý
        const postRequest = {
          // Tạo đối tượng postRequest từ dữ liệu ticket
          MaTicket: MaTicket,
          NguoiCapNhat: currentUser.Email,
        };

        const resp = await api.deleteTicket({
          // Gọi API để xóa ticket
          strJson: JSON.stringify(postRequest), // Chuyển đổi dữ liệu thành chuỗi JSON
        });
        if (resp.Success) {
          // Kiểm tra nếu thành công
          message.success(
            "Xóa ticket thành công!",
            2,
            () => navigate("/dashboard/khachhang") // Thông báo thành công và điều hướng trang về trang khách hàng
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
      // Hiển thị modal xác nhận chuyển trạng thái
      title: "Chuyển trạng thái", // Tiêu đề modal
      content: content({
        // Nội dung modal
        currentStatus: data?.Info?.MaTrangThaiTicket, // Trạng thái hiện tại
        newStatus: "Processing", // Trạng thái mới
      }),
      onOk: async () => {
        // Hàm onOk sẽ được gọi khi click vào nút đồng ý
        const postRequest = {
          // Tạo đối tượng postRequest từ dữ liệu ticket
          MaTicket: MaTicket,
          MaTrangThaiTicket: "Processing",
          NguoiCapNhat: currentUser.Email,
        };

        const resp = await api.updateTrangThaiTicket({
          // Gọi API để cập nhật trạng thái ticket
          strJson: JSON.stringify(postRequest), // Chuyển đổi dữ liệu thành chuỗi JSON
        });
        if (resp.Success) {
          message.success("Cập nhật trạng thái thành công!"); // Thông báo thành công
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
    // Hàm handleClose sẽ được gọi khi click vào nút đóng
    await Modal.confirm({
      // Hiển thị modal xác nhận chuyển trạng thái
      title: "Chuyển trạng thái", // Tiêu đề modal
      content: content({
        // Nội dung modal
        currentStatus: data?.Info?.MaTrangThaiTicket, // Trạng thái hiện tại
        newStatus: "Closed", // Trạng thái mới
      }),
      onOk: async () => {
        // Hàm onOk sẽ được gọi khi click vào nút đồng ý
        const postRequest = {
          // Tạo đối tượng postRequest từ dữ liệu ticket
          MaTicket: MaTicket,
          MaTrangThaiTicket: "Closed",
          NguoiCapNhat: currentUser.Email,
        };

        // Gọi API để cập nhật trạng thái ticket
        const resp = await api.updateTrangThaiTicket({
          strJson: JSON.stringify(postRequest),
        });

        if (resp.Success) {
          // Kiểm tra nếu thành công
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
    // Hàm handleSolved sẽ được gọi khi click vào nút hoàn thành
    await Modal.confirm({
      // Hiển thị modal xác nhận chuyển trạng thái
      title: "Chuyển trạng thái", // Tiêu đề modal
      content: content({
        // Nội dung modal
        currentStatus: data?.Info?.MaTrangThaiTicket, // Trạng thái hiện tại
        newStatus: "Solved", // Trạng thái mới
      }),
      onOk: async () => {
        // Hàm onOk sẽ được gọi khi click vào nút đồng ý
        const postRequest = {
          // Tạo đối tượng postRequest từ dữ liệu ticket
          MaTicket: MaTicket, // Mã ticket
          MaTrangThaiTicket: "Solved", // Trạng thái mới
          NguoiCapNhat: currentUser.Email, // Người cập nhật
        };

        const resp = await api.updateTrangThaiTicket({
          strJson: JSON.stringify(postRequest), // Gọi API để cập nhật trạng thái ticket
        });
        if (resp.Success) {
          // Kiểm tra nếu thành công
          message.success("Cập nhật trạng thái thành công!"); // Thông báo thành công
          refetch(); // Làm mới dữ liệu
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
  }; // Hàm handleClickDropdown sẽ được gọi khi click vào dropdown

  const renderTime = () => {
    // Hàm renderTime sẽ hiển thị thời gian xử lý
    if (data?.Info?.FlagQuaHanXuLy == 1) {
      // Kiểm tra nếu quá hạn xử lý
      if (
        data?.Info?.MaTrangThaiTicket == "Closed" || // Kiểm tra nếu trạng thái là Closed
        data?.Info?.MaTrangThaiTicket == "Solved" // Kiểm tra nếu trạng thái là Solved
      ) {
        return data?.Info?.ThoiGianXuLy; // Trả về thời gian xử lý
      } else {
        return <CountTime baseTime={data?.Info?.ThoiGianXuLy} />; // Trả về bộ đếm thời gian xử lý
      }
    } else {
      if (
        data?.Info?.MaTrangThaiTicket == "Closed" || // Kiểm tra nếu trạng thái là Closed
        data?.Info?.MaTrangThaiTicket == "Solved" // Kiểm tra nếu trạng thái là Solved
      ) {
        return data?.Info?.ThoiGianXuLy; // Trả về thời gian xử lý
      } else {
        return <CountTime baseTime={data?.Info?.ThoiGianXuLy} />; // Trả về bộ đếm thời gian xử lý
      }
    }
  };

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
                items: filteredListDropdown(data?.Info?.MaTrangThaiTicket),
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
                {data?.Info?.TenTicket} - {data?.Info?.MaTicket}
              </Typography.Text>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex justify="end">
              {data?.Info?.FlagQuaHanXuLy == 1 && (
                <Tag color="red">Quá hạn xử lý</Tag>
              )}
            </Flex>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={1}></Col>

          <Col span={3}>
            {data?.Info?.AnhDaiDien ? (
              <Avatar size={100} src={data?.Info?.AnhDaiDien}></Avatar>
            ) : (
              <Avatar size={100}>{data?.Info?.TenKhachHang?.[0]}</Avatar>
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
                  {data?.Info?.TenKhachHang}
                </Typography.Text>
              </Flex>
              <Flex gap={10}>
                <Typography>SĐT Khách hàng:</Typography>
                <Typography.Text strong>
                  {data?.Info?.SoDienThoai}
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
                  {data?.Info?.TenPhanLoaiTicket}
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
                  {data?.Info?.TicketDeadline}
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
