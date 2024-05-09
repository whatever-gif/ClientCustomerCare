import { Col, DatePicker, Form, Input, Row } from "antd";
import React from "react";
import "./FormTimKiem.scss";

const FormTimKiem = () => {
  const { RangePicker } = DatePicker;

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { Search } = Input;

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
      style={{
        marginBottom: 10,
      }}
    >
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Search
            placeholder="Tìm theo mã và tên"
            allowClear
            enterButton="Tìm kiếm"
            size="middle"
            // onSearch={onSearch}
          />
        </Col>
        <Col span={8}></Col>
      </Row>
    </Form>
  );
};

export default FormTimKiem;
