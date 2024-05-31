import { DeleteOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Form,
  message,
  Modal,
  Row,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useAuthInfo } from "../../../../../../../components/auth/useAuthInfo";
import { useApiService } from "../../../../../../../components/service/useApiService";

// Component QuaTrinhXuLy sẽ hiển thị danh sách quá trình xử lý của ticket
// forwardRef để truy cập các hàm của component từ bên ngoài
// Sử dụng hook useImperativeHandle để tạo hàm setList để cập nhật danh sách quá trình xử lý
const QuaTrinhXuLy = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => ({
    // Sử dụng hook useImperativeHandle để tạo hàm setList để cập nhật danh sách quá trình xử lý
    setList: (data) => {
      if (data) {
        setList(data);
      }
    },
  }));

  const [form] = Form.useForm(); // Sử dụng hook Form.useForm để tạo form

  const { MaTicket } = useParams(); // Lấy MaTicket từ url

  const { currentUser } = useAuthInfo(); // Sử dụng hook useAuthInfo để lấy thông tin người dùng hiện tại

  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  const [list, setList] = useState([]); // Sử dụng hook useState để lưu trữ danh sách quá trình xử lý

  const onFinish = async (values) => {
    // Hàm onFinish sẽ được gọi khi form được submit

    if (!values.NoiDungXuLy) {
      // Kiểm tra nếu không có nội dung xử lý
      message.error("Vui lòng nhập Nội dung Ghi chú trước khi Lưu"); // Thông báo lỗi
      return; // Kết thúc hàm
    }

    // Tạo đối tượng postRequest từ dữ liệu form
    const postRequest = {
      MaTicket: MaTicket,
      NoiDungXuLy: values.NoiDungXuLy,
      NguoiXuLy: currentUser.Email,
    };

    const resp = await api.createProcess({
      strJson: JSON.stringify(postRequest),
    }); // Gọi API để thêm quá trình xử lý

    if (resp.Success) {
      message.success("Thêm quá trình xử lý thành công"); // Thông báo thành công

      const data = resp.DataList; // Lấy dữ liệu từ response

      if (data) {
        setList(data); // Cập nhật danh sách quá trình xử lý
        form.resetFields(); // Reset form
      }
    } else {
      if (resp.Error) {
        // Kiểm tra nếu có lỗi
        message.error(resp.Error);
      } else {
        message.error("Có lỗi xảy ra");
      }
    }
  };

  const handleDelete = async (data) => {
    // Hàm handleDelete sẽ được gọi khi click vào nút xóa
    await Modal.confirm({
      // Hiển thị modal xác nhận xóa
      title: "Xác nhận xóa", // Tiêu đề modal
      content: "Bạn có chắc chắn muốn xóa quá trình xử lý này không?", // Nội dung modal
      onOk: async () => {
        const postRequest = {
          // Tạo đối tượng postRequest từ dữ liệu quá trình xử lý
          MaXuLy: data.MaXuLy,
          MaTicket: data.MaTicket,
        };

        const resp = await api.deleteProcess({
          strJson: JSON.stringify(postRequest),
        }); // Gọi API để xóa quá trình xử lý

        if (resp.Success) {
          // Kiểm tra nếu thành công
          message.success("Xóa quá trình xử lý thành công!"); // Thông báo thành công
          setList(resp.DataList);
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

  const render = useMemo(() => {
    // Sử dụng hook useMemo để tối ưu hóa performance
    return list.map((item, index) => {
      // Duyệt qua danh sách quá trình xử lý
      return (
        <Card key={index}>
          <Flex align="center" gap={10} justify="space-between">
            <Flex gap={10} align="center">
              {item.Avatar ? (
                <Avatar src={item.Avatar} />
              ) : (
                <Avatar alt={item.TenNguoiXuLy}>
                  {item.TenNguoiXuLy ? item.TenNguoiXuLy[0] : null}
                </Avatar>
              )}
              <Typography.Text strong>
                {item.TenNguoiXuLy} - {String(item.ThoiGianXuLy)}
              </Typography.Text>
            </Flex>
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(item)}
              size="middle"
              icon={<DeleteOutlined />}
            ></Button>
          </Flex>
          <Typography style={{ marginTop: 10 }}>
            <strong>Nội dung:</strong> {item.NoiDungXuLy}
          </Typography>
        </Card>
      );
    });
  }, [list]);

  return (
    <Flex
      vertical
      style={{
        minHeight: 450,
        height: 100,
        overflowY: "auto",
        overflowX: "hidden",
        padding: "20px 10px 100px 10px",
      }}
      gap={10}
    >
      <Form
        form={form}
        name="ThemQTXL"
        onFinish={onFinish}
        autoComplete="off"
        labelWrap
        colon={false}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="NoiDungXuLy">
              <TextArea rows={5} placeholder="Nhập nội dung..."></TextArea>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}></Col>
          <Col span={12} dir="rtl">
            <Form.Item>
              <Button type="primary" dir="rtl" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {render} {/* Hiển thị danh sách quá trình xử lý */}
    </Flex>
  );
});

export default QuaTrinhXuLy;
