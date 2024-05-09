import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import React from "react";
import { useConfigApi } from "../../../../../../components/api/useConfigApi";
import "./FormTimKiem.scss";

const FormTimKiem = ({ formValue, onFormSubmit }) => {
  const { RangePicker } = DatePicker;

  const { get } = useConfigApi();

  const { data: listTrangThaiTicket } = useQuery({
    queryKey: ["listTrangThaiTicket"],
    queryFn: async () => {
      const result = await get("trangthaiticket/search");

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : [];

      return dataList.map((item) => {
        return {
          label: item.TenTrangThaiTicket,
          value: item.MaTrangThaiTicket,
        };
      });
    },
    refetchOnWindowFocus: false,
  });

  const { data: listKhachHang } = useQuery({
    queryKey: ["listKhachHang"],
    queryFn: async () => {
      const result = await get("khachhang/search");

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : [];

      return dataList.map((item) => {
        return {
          label: item.TenKhachHang,
          value: item.MaKhachHang,
        };
      });
    },
    refetchOnWindowFocus: false,
  });

  // get all nguoi dung
  const { data: listNguoiDung } = useQuery({
    queryKey: ["listNguoiDung"],
    queryFn: async () => {
      const result = await get("nguoidung/search");

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : [];

      return dataList.map((item) => {
        return {
          label: item.TenNguoiDung,
          value: item.Email,
        };
      });
    },
    refetchOnWindowFocus: false,
  });

  // get all phan loai ticket
  const { data: listPhanLoaiTicket } = useQuery({
    queryKey: ["listPhanLoaiTicket"],
    queryFn: async () => {
      const result = await get("phanloaiticket/search");

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : [];

      return dataList.map((item) => {
        return {
          label: item.TenPhanLoaiTicket,
          value: item.MaPhanLoaiTicket,
        };
      });
    },
    refetchOnWindowFocus: false,
  });

  const onFinish = (values) => {
    const result = {
      ...formValue,
      MaTicket: values.MaTicket ?? "",
      TenTicket: values.TenTicket ?? "",
      MaKhachHang: values.MaKhachHang ?? "",
      MaPhanLoaiTicket: values.MaPhanLoaiTicket ?? "",
      MaTrangThaiTicket: values.MaTrangThaiTicket ?? "",
      FlagQuaHanXuLy: values.FlagQuaHanXuLy == true ? 1 : 0,
      ThoiGianTaoTu:
        values.ThoiGianTao && values.ThoiGianTao[0]
          ? values.ThoiGianTao[0].format("YYYY-MM-DD")
          : null,
      ThoiGianTaoDen:
        values.ThoiGianTao && values.ThoiGianTao[1]
          ? values.ThoiGianTao[1].format("YYYY-MM-DD")
          : null,
      NguoiTao: values.NguoiTao ?? "",
    };

    onFormSubmit(result);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelWrap
      colon={false}
    >
      <Row gutter={24}>
        <Col span={7}>
          <Form.Item label="Mã eTicket" name="MaTicket">
            <Input />
          </Form.Item>
          <Form.Item label="Tên eTicket" name="TenTicket">
            <Input />
          </Form.Item>
          <Form.Item label="Khách hàng" name="MaKhachHang">
            <Select
              options={listKhachHang}
              allowClear
              showSearch
              filterOption={filterOption}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Phân loại" name="MaPhanLoaiTicket">
            <Select
              options={listPhanLoaiTicket}
              allowClear
              filterOption
              showSearch
            />
          </Form.Item>
          <Form.Item label="Trạng thái" name="MaTrangThaiTicket">
            <Select
              options={listTrangThaiTicket}
              allowClear
              filterOption
              showSearch
            />
          </Form.Item>
          <Form.Item label="" name="FlagQuaHanXuLy" valuePropName="checked">
            <Checkbox
              style={{
                marginLeft: 100,
              }}
            >
              Quá hạn xử lý
            </Checkbox>
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Thời gian tạo" name="ThoiGianTao">
            <RangePicker width={"100%"} allowEmpty={[true, false]} />
          </Form.Item>
          <Form.Item label="Người tạo" name="NguoiTao">
            <Select
              options={listNguoiDung}
              allowClear
              filterOption
              showSearch
            ></Select>
          </Form.Item>
        </Col>
        <Col span={3} aria-rowspan={3}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              dir="rtl"
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FormTimKiem;
