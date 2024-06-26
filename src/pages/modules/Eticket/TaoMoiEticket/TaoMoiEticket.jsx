import {
  AutoComplete,
  Avatar,
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthInfo } from "../../../../components/auth/useAuthInfo";
import { customizeRequiredMark } from "../../../../components/reuse/CustomRequire";
import { useApiService } from "../../../../components/service/useApiService";
import PopupThemMoiKhachHang from "./ChiTietEticket/components/popup/PopupThemMoiKhachHang";
import { useEticketDataSource } from "./ChiTietEticket/components/Tabs/dataSource/useEticketDataSource";
import "./components/TaoMoiEticket.scss";

const TaoMoiEticket = () => {
  const [form] = Form.useForm();

  const optionsKhachHang = Form.useWatch("ListKhachHang", {
    form,
    preserve: true,
  }); // Sử dụng hook Form.useWatch để theo dõi thay đổi của ListKhachHang

  const maKhachHangCustom = Form.useWatch("MaKhachHangCustom", {
    form,
    preserve: true,
  }); // Sử dụng hook Form.useWatch để theo dõi thay đổi của MaKhachHangCustom

  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  const popupRef = useRef(); // Sử dụng hook useRef để tạo popupRef

  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng trang
  const { Type, MaTicket } = useParams(); // Lấy Type và MaTicket từ url
  const { currentUser } = useAuthInfo(); // Sử dụng hook useAuthInfo để lấy thông tin người dùng hiện tại

  const dataSource = useEticketDataSource(); // Sử dụng hook useEticketDataSource để lấy dữ liệu init

  const getDetail = async () => {
    // Hàm getDetail sẽ được gọi khi Type == "update"
    const resp = await api.getByMaTicket({
      MaTicket: MaTicket,
    }); // Gọi API để lấy dữ liệu chi tiết ticket

    if (resp && resp.Success) {
      // Kiểm tra nếu có dữ liệu trả về
      const data = resp.Data.Eticket; // Lấy dữ liệu ticket từ response
      form.setFieldsValue({
        MaTicket: data.MaTicket,
        MaTrangThaiTicket: data.MaTrangThaiTicket,
        TenTicket: data.TenTicket,
        MaKhachHang: data.MaKhachHang,
        ChiTiet: data.ChiTiet,
        MaPhanLoaiTicket: data.MaPhanLoaiTicket,
        TicketDeadline: data.TicketDeadline
          ? dayjs(data.TicketDeadline, "YYYY-MM-DD HH:mm:ss")
          : null,
        NguoiTao: currentUser.Email,
        ListKhachHang: [
          // Set giá trị cho ListKhachHang
          {
            key: data.MaKhachHang,
            label: (
              <Flex align="center" gap={10}>
                <Avatar>{data.TenKhachHang[0]}</Avatar>
                {data.MaKhachHang} - {data.TenKhachHang}
              </Flex>
            ),
            value: `${data.MaKhachHang} - ${data.TenKhachHang}`,
          },
        ],
        MaKhachHangCustom: `${data.MaKhachHang} - ${data.TenKhachHang}`, // Set giá trị cho MaKhachHangCustom
      }); // Set giá trị cho form
    } else {
      message.error(resp.Error);
    }
  };

  const onFinish = async (values) => {
    // Hàm onFinish sẽ được gọi khi form được submit
    const postRequest = {
      // Tạo đối tượng postRequest từ dữ liệu form
      MaTicket: values.MaTicket,
      MaTrangThaiTicket: values.MaTrangThaiTicket,
      TenTicket: values.TenTicket,
      MaKhachHang: values.MaKhachHang,
      ChiTiet: values.ChiTiet,
      MaPhanLoaiTicket: values.MaPhanLoaiTicket,
      TicketDeadline: values.TicketDeadline
        ? values.TicketDeadline.format("YYYY-MM-DD HH:mm:ss")
        : null,
      NguoiTao: currentUser.Email,
    };

    if (Type == "update") {
      // Kiểm tra nếu Type == "update"
      const resp = await api.updateTicket({
        // Gọi API để cập nhật ticket
        strJson: JSON.stringify({
          ...postRequest,
          NguoiCapNhat: postRequest.NguoiTao,
        }),
      });

      if (resp.Success) {
        // Kiểm tra nếu thành công
        message.success("Cập nhật ticket thành công!", 2, () =>
          navigate("/dashboard/eticket")
        );
      } else {
        message.error("Cập nhật ticket thất bại!");
      }
    }

    if (Type == "add") {
      // Kiểm tra nếu Type == "add"
      const resp = await api.createTicket({
        // Gọi API để tạo mới ticket
        strJson: JSON.stringify(postRequest),
      });

      if (resp.Success) {
        // Kiểm tra nếu thành công
        message.success(
          "Tạo mới ticket thành công!",
          2,
          () => navigate("/dashboard/eticket") // Hiển thị thông báo thành công và điều hướng trang
        );
      } else {
        message.error("Tạo mới ticket thất bại!"); // Hiển thị thông báo lỗi
      }
    }
  };

  const handleBack = () => {
    // Hàm handleBack sẽ được gọi khi click vào nút quay lại
    navigate("/dashboard/eticket");
  };

  const handleSearchKhachHang = async (value) => {
    // Hàm handleSearchKhachHang sẽ được gọi khi tìm kiếm khách hàng
    const response = await api.getKhachHang({
      // Gọi API để lấy danh sách khách hàng
      TenKhachHang: value,
    });
    if (response.Success) {
      // Kiểm tra nếu thành công
      const result = response.DataList.map((item) => ({
        // Lấy dữ liệu từ response
        key: item.MaKhachHang,
        label: (
          <Flex align="center" gap={10}>
            {item.AnhDaiDien ? (
              <Avatar src={item.AnhDaiDien} />
            ) : (
              <Avatar>{item.TenKhachHang[0]}</Avatar>
            )}
            {item.MaKhachHang} - {item.TenKhachHang}
          </Flex>
        ),
        value: `${item.MaKhachHang} - ${item.TenKhachHang}`,
      }));

      form.setFieldValue("ListKhachHang", result); // Set giá trị cho ListKhachHang
    }
  };

  const handleClearKhachHang = () => {
    form.setFieldValue("MaKhachHangCustom", null); // Set giá trị cho MaKhachHangCustom
  };

  useEffect(() => {
    if (MaTicket && Type == "update") {
      // Kiểm tra nếu MaTicket và Type == "update"
      getDetail(); // Gọi hàm getDetail
    }
  }, [Type, MaTicket]); // Sử dụng hook useEffect để gọi hàm getDetail khi Type == "update"

  const handleOpenPopupThemMoiKhachHang = () => {
    // Hàm handleOpenPopupThemMoiKhachHang sẽ được gọi khi click vào nút Thêm mới
    if (popupRef.current) {
      popupRef.current?.show();
    }
  };

  const onSuccess = (data) => {
    // Hàm onSuccess sẽ được gọi khi thêm mới khách hàng thành công
    form.setFieldValue("MaKhachHang", data.MaKhachHang);
    form.setFieldValue(
      "MaKhachHangCustom",
      `${data.MaKhachHang} - ${data.TenKhachHang}`
    );

    form.setFieldsValue({
      ListKhachHang: [
        {
          key: data.MaKhachHang,
          label: (
            <Flex align="center" gap={10}>
              {data.AnhDaiDien ? (
                <Avatar src={data.AnhDaiDien} />
              ) : (
                <Avatar>{data.TenKhachHang[0]}</Avatar>
              )}
              {data.MaKhachHang} - {data.TenKhachHang}
            </Flex>
          ),
          value: `${data.MaKhachHang} - ${data.TenKhachHang}`,
        },
      ],
    });
  };

  return (
    <Form
      form={form}
      name="TaoMoiEticket"
      initialValues={{
        MaTicket: null,
        MaTrangThaiTicket: "Open",
        MaKhachHang: null,
      }}
      onFinish={onFinish}
      autoComplete="off"
      labelWrap
      colon={false}
      requiredMark={customizeRequiredMark}
    >
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
                title: Type == "add" ? "Tạo mới Eticket" : "Cập nhật Eticket",
              },
            ]}
          />
        </Col>
        <Col span={12} dir="rtl">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Col>
      </Row>
      <Divider prefixCls="divider-custom" />
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Mã eTicket" name="MaTicket">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Trạng thái"
            name="MaTrangThaiTicket"
            rules={[
              { required: true, message: "Vui lòng nhập trạng thái eTicket!" },
            ]}
          >
            <Select
              options={dataSource.ListTrangThai}
              filterOption
              showSearch
            />
          </Form.Item>
          <Form.Item name="MaKhachHang" hidden>
            <Input hidden />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            label="Tên eTicket"
            name="TenTicket"
            rules={[{ required: true, message: "Vui lòng nhập tên eTicket!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            label="Khách hàng"
            name="MaKhachHangCustom"
            rules={[{ required: true, message: "Vui lòng chọn Khách hàng!" }]}
          >
            <Flex gap={10}>
              <AutoComplete
                options={optionsKhachHang}
                onSearch={handleSearchKhachHang}
                showSearch
                allowClear
                onClear={handleClearKhachHang}
                onSelect={(value, option) => {
                  form.setFieldValue("MaKhachHang", option.key);
                  form.setFieldValue("MaKhachHangCustom", value);
                }}
                value={maKhachHangCustom}
                onChange={(value) =>
                  form.setFieldValue("MaKhachHangCustom", value)
                }
              />
              <Button type="primary" onClick={handleOpenPopupThemMoiKhachHang}>
                Thêm mới
              </Button>
            </Flex>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="Chi tiết" name="ChiTiet">
            <TextArea rows={5} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label="Phân loại"
            name="MaPhanLoaiTicket"
            rules={[
              { required: true, message: "Vui lòng chọn phân loại eTicket!" },
            ]}
          >
            <Select options={dataSource.ListPhanLoai} filterOption showSearch />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Deadline"
            name="TicketDeadline"
            rules={[
              { required: true, message: "Vui lòng chọn deadline eTicket!" },
            ]}
          >
            <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
          </Form.Item>
        </Col>
      </Row>

      <PopupThemMoiKhachHang ref={popupRef} onSuccess={onSuccess} />
    </Form>
  );
};

export default TaoMoiEticket;
