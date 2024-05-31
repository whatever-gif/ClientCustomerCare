import { SearchOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import React from "react";
import "./FormTimKiem.scss";
import { useDataSource } from "./components/useDataSource";

const FormTimKiem = ({ onFormSubmit }) => {
  // Lấy component RangePicker từ DatePicker
  const { RangePicker } = DatePicker;

  // Sử dụng hook useDataSource để lấy dữ liệu
  const dataSource = useDataSource();

  // Hàm onFinish sẽ được gọi khi form được submit
  const onFinish = (values) => {
    // Tạo đối tượng result từ dữ liệu form
    const result = {
      // Lấy giá trị MaPhanLoaiTicket từ form, nếu không có thì mặc định là chuỗi rỗng
      MaPhanLoaiTicket: values.MaPhanLoaiTicket ?? "",
      // Lấy giá trị ThoiGianTaoTu từ form, nếu không có thì mặc định là null
      ThoiGianTaoTu:
        values.ThoiGianTao && values.ThoiGianTao[0]
          ? values.ThoiGianTao[0].format("YYYY-MM-DD")
          : null,
      // Lấy giá trị ThoiGianTaoDen từ form, nếu không có thì mặc định là null
      ThoiGianTaoDen:
        values.ThoiGianTao && values.ThoiGianTao[1]
          ? values.ThoiGianTao[1].format("YYYY-MM-DD")
          : null,
      // Lấy giá trị NguoiTao từ form, nếu không có thì mặc định là chuỗi rỗng
      NguoiTao: values.NguoiTao ?? "",
      // Tạo id ngẫu nhiên cho đối tượng result
      id: faker.string.uuid(),
    };

    // Gọi hàm onFormSubmit và truyền đối tượng result vào
    onFormSubmit(result);
  };

  // hàm này để khi ta tìm kiếm nhanh trong select box sẽ không biệt hoa - thường
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase()); // Hàm filterOption sẽ được gọi khi tìm kiếm

  return (
    <Form
      name="basic"
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
          <Form.Item label="Người tạo" name="NguoiTao">
            <Select
              options={dataSource.ListNguoiDung}
              allowClear
              filterOption={filterOption}
              showSearch
            ></Select>
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Phân loại" name="MaPhanLoaiTicket">
            <Select
              options={dataSource.ListPhanLoai}
              allowClear
              filterOption={filterOption}
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Thời gian tạo" name="ThoiGianTao">
            <RangePicker width={"100%"} allowEmpty={[true, false]} />
          </Form.Item>
        </Col>
        <Col span={3}>
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
