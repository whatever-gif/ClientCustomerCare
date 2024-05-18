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
import { useEticketDataSource } from "./ChiTietEticket/components/Tabs/dataSource.js/useEticketDataSource";
import "./components/TaoMoiEticket.scss";

const TaoMoiEticket = () => {
  const [form] = Form.useForm();

  const optionsKhachHang = Form.useWatch("ListKhachHang", {
    form,
    preserve: true,
  });

  const maKhachHangCustom = Form.useWatch("MaKhachHangCustom", {
    form,
    preserve: true,
  });

  const api = useApiService();

  const popupRef = useRef();

  const navigate = useNavigate();
  const { Type, MaTicket } = useParams();
  const { currentUser } = useAuthInfo();

  const dataSource = useEticketDataSource();

  const getDetail = async () => {
    const resp = await api.getByMaTicket({
      MaTicket: MaTicket,
    });

    if (resp && resp.Success) {
      const data = resp.Data.Eticket;
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
        MaKhachHangCustom: `${data.MaKhachHang} - ${data.TenKhachHang}`,
      });
    } else {
      message.error(resp.Error);
    }
  };

  const onFinish = async (values) => {
    const postRequest = {
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
      const resp = await api.updateTicket({
        strJson: JSON.stringify({
          ...postRequest,
          NguoiCapNhat: postRequest.NguoiTao,
        }),
      });

      if (resp.Success) {
        message.success("Cập nhật ticket thành công!", 2, () =>
          navigate("/dashboard/eticket")
        );
      } else {
        message.error("Cập nhật ticket thất bại!");
      }
    }

    if (Type == "add") {
      const resp = await api.createTicket({
        strJson: JSON.stringify(postRequest),
      });

      if (resp.Success) {
        message.success("Tạo mới ticket thành công!", 2, () =>
          navigate("/dashboard/eticket")
        );
      } else {
        message.error("Tạo mới ticket thất bại!");
      }
    }
  };

  const onFinishFailed = () => {};

  const { RangePicker } = DatePicker;

  const handleBack = () => {
    navigate("/dashboard/eticket");
  };

  const handleSearchKhachHang = async (value) => {
    const response = await api.getKhachHang({
      TenKhachHang: value,
    });
    if (response.Success) {
      const result = response.DataList.map((item) => ({
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

      form.setFieldValue("ListKhachHang", result);
    }
  };

  const handleClearKhachHang = () => {
    form.setFieldValue("MaKhachHangCustom", null);
  };

  useEffect(() => {
    if (MaTicket && Type == "update") {
      getDetail();
    }
  }, [Type, MaTicket]);

  const handleOpenPopupThemMoiKhachHang = () => {
    if (popupRef.current) {
      popupRef.current?.show();
    }
  };

  const onSuccess = (data) => {
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
      onFinishFailed={onFinishFailed}
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
