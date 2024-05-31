import { PlusOutlined } from "@ant-design/icons";
import {
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
  const [form] = Form.useForm(); // Sử dụng hook Form.useForm để tạo form

  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  const { currentUser } = useAuthInfo(); // Sử dụng hook useAuthInfo để lấy thông tin user hiện tại

  const { Type, MaKhachHang } = useParams(); // Sử dụng hook useParams để lấy tham số trên url

  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng trang

  const listTinhTP = Form.useWatch("ListTinhTP", { form, preserve: true }); // Sử dụng hook Form.useWatch để theo dõi giá trị của ListTinhTP
  const listQuanHuyen = Form.useWatch("ListQuanHuyen", {
    form,
    preserve: true,
  }); // Sử dụng hook Form.useWatch để theo dõi giá trị của ListQuanHuyen
  const listPhuongXa = Form.useWatch("ListPhuongXa", { form, preserve: true }); // Sử dụng hook Form.useWatch để theo dõi giá trị của ListPhuongXa

  const onFinish = async (values) => {
    // Hàm onFinish sẽ được gọi khi form được submit
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
    }; // Tạo đối tượng postRequest từ dữ liệu form

    if (Type == "update") {
      // Nếu Type là update
      const resp = await api.updateKhachHang({
        strJson: JSON.stringify(postRequest),
      }); // Gọi API để cập nhật khách hàng

      if (resp.Success) {
        message.success("Cập nhật khách hàng thành công!", 1, () =>
          navigate("/dashboard/khachhang")
        ); // Hiển thị thông báo cập nhật thành công
      } else {
        message.error("Cập nhật khách hàng thất bại!"); // Hiển thị thông báo cập nhật thất bại
      }
    }

    if (Type == "add") {
      // Nếu Type là add
      const resp = await api.createKhachHang({
        // Gọi API để tạo mới khách hàng
        strJson: JSON.stringify(postRequest), //  Truyền dữ liệu postRequest vào API
      });

      if (resp.Success) {
        // Nếu tạo mới thành công
        message.success(
          "Tạo mới khách hàng thành công!",
          1,
          () => navigate("/dashboard/khachhang") // Hiển thị thông báo tạo mới thành công
        );
      } else {
        message.error("Tạo mới khách hàng thất bại!"); // Hiển thị thông báo tạo mới thất bại
      }
    }
  };

  const getDetail = async () => {
    const resp = await api.getDetailKhachHang({
      MaKhachHang: MaKhachHang,
    }); // Gọi API để lấy thông tin chi tiết khách hàng

    if (resp && resp.Success) {
      // Nếu API trả về thành công
      const data = resp.Data; // Lấy dữ liệu từ API
      form.setFieldsValue({
        // Set giá trị cho form
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
        // Nếu có mã quốc gia
        await api.getTinhTPByMaQuocGia(data.MaQuocGia).then((res) => {
          // Gọi API lấy danh sách tỉnh/TP
          if (res && res.DataList) {
            // Nếu có dữ liệu trả về
            const result = res.DataList.map((item) => {
              // Lấy danh sách tỉnh/TP từ response
              return {
                label: item.TenTinhTp,
                value: item.MaTinhTp,
              };
            });
            form.setFieldValue("ListTinhTP", result); // Set giá trị cho ListTinhTP
          }
        });
      }

      if (data.MaTinhTP) {
        // Nếu có mã tỉnh/TP
        await api.getQuanHuyenByMaTinhTP(data.MaTinhTP).then((res) => {
          // Gọi API lấy danh sách quận/huyện
          if (res && res.DataList) {
            // Nếu có dữ liệu trả về
            const result = res.DataList.map((item) => {
              // Lấy danh sách quận/huyện từ response
              return {
                label: item.TenQuanHuyen,
                value: item.MaQuanHuyen,
              };
            });
            form.setFieldValue("ListQuanHuyen", result); // Set giá trị cho ListQuanHuyen
          }
        });
      }

      if (data.MaQuanHuyen) {
        // Nếu có mã quận/huyện
        await api.getPhuongXaByMaQuanHuyen(data.MaQuanHuyen).then((res) => {
          // Gọi API lấy danh sách xã/phường
          if (res && res.DataList) {
            // Nếu có dữ liệu trả về
            const result = res.DataList.map((item) => {
              // Lấy danh sách xã/phường từ response
              return {
                label: item.TenPhuongXa,
                value: item.MaPhuongXa,
              };
            });
            form.setFieldValue("ListPhuongXa", result); // Set giá trị cho ListPhuongXa
          }
        });
      }

      if (data.MaPhuongXa) {
        await api.getPhuongXaByMaQuanHuyen(data.MaQuanHuyen).then((res) => {
          // Gọi API lấy danh sách xã/phường
          if (res && res.DataList) {
            const result = res.DataList.map((item) => {
              return {
                label: item.TenPhuongXa,
                value: item.MaPhuongXa,
              };
            });
            form.setFieldValue("ListPhuongXa", result); // Set giá trị cho ListPhuongXa
          }
        });
      }
    }
  }; // Hàm getDetail sẽ được gọi khi Type và MaKhachHang thay đổi

  useEffect(() => {
    if (MaKhachHang) {
      getDetail(); // Gọi hàm getDetail
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
    // Hàm xóa quốc gia
    form.setFieldsValue({
      // Set giá trị cho form
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
    // Hàm xóa tỉnh/TP
    form.setFieldsValue({
      MaTinhTp: null,
      MaQuanHuyen: null,
      MaPhuongXa: null,
      ListQuanHuyen: [],
      ListPhuongXa: [],
    });
  };

  const handleClearQuanHuyen = () => {
    // Hàm xóa quận/huyện
    form.setFieldsValue({
      MaQuanHuyen: null,
      MaPhuongXa: null,
      ListPhuongXa: [],
    });
  };

  const handleClearPhuongXa = () => {
    // Hàm xóa xã/phường
    form.setFieldsValue({
      MaPhuongXa: null,
    });
  };

  const handleBack = () => {
    // Hàm quay lại
    navigate("/dashboard/khachhang"); // Điều hướng đến trang quản lý khách hàng
  };

  const previewImage = useWatch("AnhDaiDienPreview", { form, preserve: true }); // Sử dụng hook useWatch để theo dõi giá trị của AnhDaiDienPreview

  const handlePreview = (info) => {
    // Hàm xem trước ảnh
    if (info.file.response?.Data?.FilePath) {
      // Nếu có đường dẫn ảnh
      form.setFieldsValue({
        AnhDaiDienPreview: info.file.response?.Data?.FilePath, // Set giá trị cho AnhDaiDienPreview
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
                <Flex vertical>
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
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
                  </Upload>
                </Flex>
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
