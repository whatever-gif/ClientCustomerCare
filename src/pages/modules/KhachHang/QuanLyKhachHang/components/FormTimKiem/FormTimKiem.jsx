import { SearchOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import React from "react";
import "./FormTimKiem.scss";
import { useDataSource } from "./components/useDataSource";

const FormTimKiem = ({ onFormSubmit }) => {
  const { RangePicker } = DatePicker;

  const dataSource = useDataSource();

  const onFinish = (values) => {
    const result = {
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
      id: faker.string.uuid(),
    };

    onFormSubmit(result);
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <Form
      name="QuanLyKhachHang"
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
          <Form.Item label="Mã khách hàng" name="MaKhachHang">
            <Input />
          </Form.Item>
          <Form.Item label="Tên khách hàng" name="TenKhachHang">
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Số điện thoại" name="SoDienThoai">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="Email">
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Ngày tạo" name="NgayTao">
            <RangePicker width={"100%"} />
          </Form.Item>
          <Form.Item label="Người tạo" name="NguoiTao">
            <Select
              options={dataSource.ListNguoiDung}
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
