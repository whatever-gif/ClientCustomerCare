import { SearchOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import React from "react";
import "./FormTimKiem.scss";
import { useDataSource } from "./components/useDataSource";

const FormTimKiem = ({ onFormSubmit }) => {
  const { RangePicker } = DatePicker;

  const dataSource = useDataSource();

  const onFinish = (values) => {
    const result = {
      MaPhanLoaiTicket: values.MaPhanLoaiTicket ?? "",
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
          <Form.Item label="Người tạo" name="NguoiTao">
            <Select
              options={dataSource.ListNguoiDung}
              allowClear
              filterOption
              showSearch
            ></Select>
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Phân loại" name="MaPhanLoaiTicket">
            <Select
              options={dataSource.ListPhanLoai}
              allowClear
              filterOption
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
