import { SearchOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import React from "react";
import "./FormTimKiem.scss";
import { useDataSource } from "./components/useDataSource";

const FormTimKiem = ({ onFormSubmit }) => {
  const { RangePicker } = DatePicker; // Lấy component RangePicker từ DatePicker

  const dataSource = useDataSource(); // Sử dụng hook useDataSource để lấy dữ liệu init

  const onFinish = (values) => {
    // Hàm onFinish sẽ được gọi khi form được submit
    const result = {
      MaKhachHang: values.MaKhachHang ?? "",
      ThoiGianTaoTu:
        values.ThoiGianTao && values.ThoiGianTao[0]
          ? values.ThoiGianTao[0].format("YYYY-MM-DD")
          : null,
      ThoiGianTaoDen:
        values.ThoiGianTao && values.ThoiGianTao[1]
          ? values.ThoiGianTao[1].format("YYYY-MM-DD")
          : null,
      NguoiTao: values.NguoiTao ?? "",
      Email: values.Email ?? "",
      TenKhachHang: values.TenKhachHang ?? "",
      SoDienThoai: values.SoDienThoai ?? "",
      id: faker.string.uuid(),
    };

    onFormSubmit(result); // Gọi hàm onFormSubmit và truyền đối tượng result vào
  };

  // hàm này để khi ta tìm kiếm nhanh trong select box sẽ không biệt hoa - thường
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase()); // Hàm filterOption sẽ được gọi khi tìm kiếm

  return (
    <Form
      name="QuanLyKhachHang"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
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
          <Form.Item label="Ngày tạo" name="ThoiGianTao">
            <RangePicker width={"100%"} />
          </Form.Item>
          <Form.Item label="Người tạo" name="NguoiTao">
            <Select
              options={dataSource.ListNguoiDung}
              allowClear
              filterOption={filterOption}
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
