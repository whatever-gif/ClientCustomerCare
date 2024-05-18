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

const QuaTrinhXuLy = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => ({
    setList: (data) => {
      setList(data);
    },
  }));

  const [form] = Form.useForm();

  const { MaTicket } = useParams();

  const { currentUser } = useAuthInfo();

  const api = useApiService();

  const [list, setList] = useState([]);

  const onFinish = async (values) => {
    if (!values.NoiDungXuLy) {
      message.error("Vui lòng nhập Nội dung Ghi chú trước khi Lưu");
      return;
    }

    const postRequest = {
      MaTicket: MaTicket,
      NoiDungXuLy: values.NoiDungXuLy,
      NguoiXuLy: currentUser.Email,
    };

    const resp = await api.createProcess({
      strJson: JSON.stringify(postRequest),
    });

    if (resp.Success) {
      message.success("Thêm quá trình xử lý thành công");

      const data = resp.DataList;

      if (data) {
        setList(data);
        form.resetFields();
      }
    } else {
      if (resp.Error) {
        message.error(resp.Error);
      } else {
        message.error("Có lỗi xảy ra");
      }
    }
  };

  const handleDelete = async (data) => {
    await Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa quá trình xử lý này không?",
      onOk: async () => {
        const postRequest = {
          MaXuLy: data.MaXuLy,
          MaTicket: data.MaTicket,
        };

        const resp = await api.deleteProcess({
          strJson: JSON.stringify(postRequest),
        });
        if (resp.Success) {
          message.success("Xóa quá trình xử lý thành công!");
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

  console.log(list);

  const render = useMemo(() => {
    return list.map((item, index) => {
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

      {render}
    </Flex>
  );
});

export default QuaTrinhXuLy;
