import { PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import { useWatch } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthInfo } from "../../../../components/auth/useAuthInfo";
import { customizeRequiredMark } from "../../../../components/reuse/CustomRequire";
import { useApiService } from "../../../../components/service/useApiService";
import "./components/TaoMoiKhachHang.scss";
import { useKhachHangDataSource } from "./components/dataSource/useKhachHangDataSource";

const TaoMoiKhachHang = () => {
  const [form] = Form.useForm();

  const api = useApiService();

  const { currentUser } = useAuthInfo();

  const { Type, MaKhachHang } = useParams();

  const navigate = useNavigate();

  const { RangePicker } = DatePicker;

  const listTinhTP = Form.useWatch("ListTinhTP", { form, preserve: true });
  const listQuanHuyen = Form.useWatch("ListQuanHuyen", {
    form,
    preserve: true,
  });
  const listPhuongXa = Form.useWatch("ListPhuongXa", { form, preserve: true });

  const onFinish = async (values) => {
    const postRequest = {
      MaKhachHang: values.MaKhachHang,
      TenKhachHang: values.TenKhachHang,
      NgaySinh: values.NgaySinh ? values.NgaySinh.format("YYYY-MM-DD") : null,
      GioiTinh: values.GioiTinh,
      MaQuocGia: values.MaQuocGia,
      MaTinhTP: values.MaTinhTp,
      MaQuanHuyen: values.MaQuanHuyen,
      MaPhuongXa: values.MaPhuongXa,
      DiaChi: values.DiaChi,
      SoDienThoai: values.SoDienThoai,
      Email: values.Email,
      SoGTTT: values.SoGTTT,
      MaGTTT: values.MaGTTT,
      NgheNghiep: values.NgheNghiep,
      MaNguonKhach: values.MaNguonKhach,
      AnhDaiDien: values.AnhDaiDienPreview,
      NguoiTao: currentUser.Email,
      TrangThai: values.TrangThai == true ? "1" : "0",
    };

    if (Type == "update") {
      const resp = await api.updateKhachHang({
        strJson: JSON.stringify(postRequest),
      });

      if (resp.Success) {
        message.success("Cập nhật khách hàng thành công!", 1, () =>
          navigate("/dashboard/khachhang")
        );
      } else {
        message.error("Cập nhật khách hàng thất bại!");
      }
    }

    if (Type == "add") {
      const resp = await api.createKhachHang({
        strJson: JSON.stringify(postRequest),
      });

      if (resp.Success) {
        message.success("Tạo mới khách hàng thành công!", 1, () =>
          navigate("/dashboard/khachhang")
        );
      } else {
        message.error("Tạo mới khách hàng thất bại!");
      }
    }
  };

  const getDetail = async () => {
    const resp = await api.getDetailKhachHang({
      MaKhachHang: MaKhachHang,
    });

    if (resp && resp.Success) {
      const data = resp.Data;
      form.setFieldsValue({
        MaKhachHang: data.MaKhachHang,
        TenKhachHang: data.TenKhachHang,
        NgaySinh: data.NgaySinh ? dayjs(data.NgaySinh, "YYYY-MM-DD") : null,
        GioiTinh: data.GioiTinh,
        MaQuocGia: data.MaQuocGia,
        MaTinhTp: data.MaTinhTP,
        MaQuanHuyen: data.MaQuanHuyen,
        MaPhuongXa: data.MaPhuongXa,
        DiaChi: data.DiaChi,
        SoDienThoai: data.SoDienThoai,
        Email: data.Email,
        SoGTTT: data.SoGTTT,
        MaGTTT: data.MaGTTT,
        NgheNghiep: data.NgheNghiep,
        MaNguonKhach: data.MaNguonKhach,
        AnhDaiDien: null,
        AnhDaiDienPreview: data.AnhDaiDien,
        NgayTao: data.NgayTao,
        NguoiTao: data.NguoiTao,
        TrangThai: data.TrangThai == "1" ? true : false,
      });

      if (data.MaQuocGia) {
        await api.getTinhTPByMaQuocGia(data.MaQuocGia).then((res) => {
          if (res && res.DataList) {
            const result = res.DataList.map((item) => {
              return {
                label: item.TenTinhTp,
                value: item.MaTinhTp,
              };
            });
            form.setFieldValue("ListTinhTP", result);
          }
        });
      }

      if (data.MaTinhTP) {
        await api.getQuanHuyenByMaTinhTP(data.MaTinhTP).then((res) => {
          if (res && res.DataList) {
            const result = res.DataList.map((item) => {
              return {
                label: item.TenQuanHuyen,
                value: item.MaQuanHuyen,
              };
            });
            form.setFieldValue("ListQuanHuyen", result);
          }
        });
      }

      if (data.MaQuanHuyen) {
        await api.getPhuongXaByMaQuanHuyen(data.MaQuanHuyen).then((res) => {
          if (res && res.DataList) {
            const result = res.DataList.map((item) => {
              return {
                label: item.TenPhuongXa,
                value: item.MaPhuongXa,
              };
            });
            form.setFieldValue("ListPhuongXa", result);
          }
        });
      }

      if (data.MaPhuongXa) {
        await api.getPhuongXaByMaQuanHuyen(data.MaQuanHuyen).then((res) => {
          if (res && res.DataList) {
            const result = res.DataList.map((item) => {
              return {
                label: item.TenPhuongXa,
                value: item.MaPhuongXa,
              };
            });
            form.setFieldValue("ListPhuongXa", result);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (MaKhachHang) {
      getDetail();
    }
  }, [Type, MaKhachHang]);

  // Khởi tạo các dataSource liên quan
  const dataSource = useKhachHangDataSource();

  const handleFormValuesChange = async (changedValues, allValues) => {
    if (changedValues.MaQuocGia) {
      await api.getTinhTPByMaQuocGia(changedValues.MaQuocGia).then((res) => {
        if (res && res.DataList) {
          const result = res.DataList.map((item) => {
            return {
              label: item.TenTinhTp,
              value: item.MaTinhTp,
            };
          });
          form.setFieldValue("ListTinhTP", result);
        }
      });
    }

    if (changedValues.MaTinhTp) {
      // Gọi API lấy danh sách quận/huyện
      await api.getQuanHuyenByMaTinhTP(changedValues.MaTinhTp).then((res) => {
        if (res && res.DataList) {
          const result = res.DataList.map((item) => {
            return {
              label: item.TenQuanHuyen,
              value: item.MaQuanHuyen,
            };
          });
          form.setFieldValue("ListQuanHuyen", result);
        }
      });
    }

    if (changedValues.MaQuanHuyen) {
      // Gọi API lấy danh sách xã/phường
      await api
        .getPhuongXaByMaQuanHuyen(changedValues.MaQuanHuyen)
        .then((res) => {
          if (res && res.DataList) {
            const result = res.DataList.map((item) => {
              return {
                label: item.TenPhuongXa,
                value: item.MaPhuongXa,
              };
            });
            form.setFieldValue("ListPhuongXa", result);
          }
        });
    }
  };

  const handleClearQuocGia = () => {
    form.setFieldsValue({
      MaQuocGia: null,
      MaTinhTp: null,
      MaQuanHuyen: null,
      MaPhuongXa: null,
      ListTinhTP: [],
      ListQuanHuyen: [],
      ListPhuongXa: [],
    });
  };

  const handleClearTinhTP = () => {
    form.setFieldsValue({
      MaTinhTp: null,
      MaQuanHuyen: null,
      MaPhuongXa: null,
      ListQuanHuyen: [],
      ListPhuongXa: [],
    });
  };

  const handleClearQuanHuyen = () => {
    form.setFieldsValue({
      MaQuanHuyen: null,
      MaPhuongXa: null,
      ListPhuongXa: [],
    });
  };

  const handleClearPhuongXa = () => {
    form.setFieldsValue({
      MaPhuongXa: null,
    });
  };

  const handleBack = () => {
    navigate("/dashboard/khachhang");
  };

  const previewImage = useWatch("AnhDaiDienPreview", { form, preserve: true });

  const handlePreview = (info) => {
    if (info.file.response?.Data?.FilePath) {
      form.setFieldsValue({
        AnhDaiDienPreview: info.file.response?.Data?.FilePath,
      });
    }
  };

  return (
    <Form
      form={form}
      name="TaoMoiKhachHang"
      onFinish={onFinish}
      autoComplete="off"
      labelWrap
      colon={false}
      requiredMark={customizeRequiredMark}
      onValuesChange={handleFormValuesChange}
      initialValues={{
        TrangThai: true,
      }}
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
                      Quản lý khách hàng
                    </span>
                  </>
                ),
              },
              {
                title:
                  Type == "add" ? "Tạo mới khách hàng" : "Cập nhật khách hàng",
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
          <Form.Item
            label="Mã khách hàng"
            name="MaKhachHang"
            rules={[
              { required: true, message: "Vui lòng nhập mã khách hàng!" },
              { max: 10, message: "Mã khách hàng tối đa 10 ký tự!" },
              {
                pattern: /^[A-Za-z0-9]+$/,
                message: "Mã khách hàng không được có ký tự đặc biệt!",
              },
            ]}
          >
            <Input disabled={Type == "update"} />
          </Form.Item>
          <Form.Item
            label="Tên khách hàng"
            name="TenKhachHang"
            rules={[
              { required: true, message: "Vui lòng nhập tên khách hàng!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Ngày sinh" name="NgaySinh">
            <DatePicker format={"YYYY-MM-DD"} />
          </Form.Item>
          <Form.Item label="Giới tính" name="GioiTinh" initialValue={"Male"}>
            <Radio.Group>
              <Radio value="Male"> Nam </Radio>
              <Radio value="Female"> Nữ </Radio>
              <Radio value="Other"> Khác </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Quốc gia" name="MaQuocGia">
            <Select
              options={dataSource.ListQuocGia}
              allowClear
              filterOption
              showSearch
              onClear={handleClearQuocGia}
            />
          </Form.Item>
          <Form.Item label="Tỉnh/TP" name="MaTinhTp">
            <Select
              options={listTinhTP}
              allowClear
              filterOption
              showSearch
              onClear={handleClearTinhTP}
            />
          </Form.Item>
          <Form.Item label="Quận/Huyện" name="MaQuanHuyen">
            <Select
              options={listQuanHuyen}
              allowClear
              filterOption
              showSearch
              onClear={handleClearQuanHuyen}
            />
          </Form.Item>
          <Form.Item label="Xã/Phường" name="MaPhuongXa">
            <Select
              options={listPhuongXa}
              allowClear
              filterOption
              showSearch
              onClear={handleClearPhuongXa}
            />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="DiaChi">
            <TextArea />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Số điện thoại"
            name="SoDienThoai"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[0-9]{9,20}$/,
                message: "Vui lòng nhập định dạng số điện thoại!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
            rules={[
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Số GTTT" name="SoGTTT">
            <Input />
          </Form.Item>
          <Form.Item label="Loại GTTT" name="MaGTTT">
            <Select
              options={dataSource.ListGTTT}
              allowClear
              filterOption
              showSearch
            />
          </Form.Item>
          <Form.Item label="Nghề nghiệp" name="NgheNghiep">
            <Input />
          </Form.Item>
          <Form.Item label="Nguồn khách" name="MaNguonKhach">
            <Select
              options={dataSource.ListNguonKhach}
              allowClear
              filterOption
              showSearch
            />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Avatar" name="AnhDaiDien">
                <Form.Item name="AnhDaiDienPreview" hidden></Form.Item>
                <Avatar
                  size={100}
                  src={previewImage}
                  style={{
                    marginBottom: 10,
                  }}
                ></Avatar>
                <Upload
                  action="https://localhost:7097/api/upload"
                  // listType="picture-card"
                  maxCount={1}
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith("image/");
                    if (!isImage) {
                      message.error("You can only upload image files!");
                    }
                    return isImage;
                  }}
                  onChange={handlePreview}
                  accept="image/*"
                  showUploadList={false}
                >
                  <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày tạo" name="NgayTao">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Người tạo" name="NguoiTao">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Trạng thái" name="TrangThai">
                <Switch disabled={Type == "add"} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default TaoMoiKhachHang;
