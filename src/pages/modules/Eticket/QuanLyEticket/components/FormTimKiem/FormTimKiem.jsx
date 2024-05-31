import { SearchOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
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
import "./FormTimKiem.scss";
import { useDataSource } from "./components/useDataSource";

const FormTimKiem = ({ onFormSubmit }) => {
  // Lấy component RangePicker từ DatePicker
  const { RangePicker } = DatePicker;

  const dataSource = useDataSource(); // Sử dụng hook useDataSource để lấy dữ liệu init

  const onFinish = (values) => {
    // Tạo đối tượng result từ dữ liệu form
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
          <Form.Item label="Mã eTicket" name="MaTicket">
            <Input />
          </Form.Item>
          <Form.Item label="Tên eTicket" name="TenTicket">
            <Input />
          </Form.Item>
          <Form.Item label="Khách hàng" name="MaKhachHang">
            <Select
              options={dataSource.ListKhachHang}
              allowClear
              showSearch
              filterOption={filterOption}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Phân loại" name="MaPhanLoaiTicket">
            <Select
              options={dataSource.ListPhanLoaiTicket}
              allowClear
              filterOption
              showSearch
            />
          </Form.Item>
          <Form.Item label="Trạng thái" name="MaTrangThaiTicket">
            <Select
              options={dataSource.ListTrangThaiTicket}
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
