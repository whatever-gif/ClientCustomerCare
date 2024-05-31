import { PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import { useWatch } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthInfo } from "../../../../../../../components/auth/useAuthInfo";
import { customizeRequiredMark } from "../../../../../../../components/reuse/CustomRequire";
import { useApiService } from "../../../../../../../components/service/useApiService";
import { useKhachHangDataSource } from "../../../../../KhachHang/TaoMoiKhachHang/components/dataSource/useKhachHangDataSource";

// Component PopupThemMoiKhachHang
// Component này dùng để hiển thị popup thêm mới khách hàng
// Popup này sẽ hiển thị khi người dùng nhấn vào nút thêm mới khách hàng
// Popup này sẽ chứa form để người dùng nhập thông tin khách hàng
// forwardRef dùng để truy cập vào các phương thức của component PopupThemMoiKhachHang từ bên ngoài
const PopupThemMoiKhachHang = forwardRef(({ onSuccess }, ref) => {
  const [open, setOpen] = useState(false); // Sử dụng useState để lưu trạng thái mở/đóng của modal

  useImperativeHandle(ref, () => ({
    // Sử dụng useImperativeHandle để truy cập vào các phương thức của component PopupThemMoiKhachHang từ bên ngoài
    show: () => {
      setOpen(true);
    },
    hide: () => {
      setOpen(false);
    },
  }));

  // Hàm handleClose sẽ được gọi khi người dùng nhấn vào nút đóng hoặc nút hủy
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const [form] = Form.useForm(); // Sử dụng hook Form.useForm để tạo form

  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  const { currentUser } = useAuthInfo(); // Sử dụng hook useAuthInfo để lấy thông tin người dùng hiện tại

  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng trang

  const { RangePicker } = DatePicker; // Lấy component RangePicker từ DatePicker

  const listTinhTP = Form.useWatch("ListTinhTP", { form, preserve: true }); // Sử dụng hook Form.useWatch để lấy giá trị của ListTinhTP từ form
  const listQuanHuyen = Form.useWatch("ListQuanHuyen", {
    form,
    preserve: true,
  }); // Sử dụng hook Form.useWatch để lấy giá trị của ListQuanHuyen từ form
  const listPhuongXa = Form.useWatch("ListPhuongXa", { form, preserve: true }); // Sử dụng hook Form.useWatch để lấy giá trị của ListPhuongXa từ form

  const onFinish = async (values) => {
    // Tạo request để gửi lên server
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

    const resp = await api.createKhachHang({
      strJson: JSON.stringify(postRequest),
    }); // Gọi API để tạo mới khách hàng

    if (resp.Success) {
      message.success("Tạo mới khách hàng thành công!"); // Hiển thị thông báo thành công

      // Kiểm tra xem có hàm onSuccess được truyền vào không
      if (onSuccess) {
        onSuccess(resp.Data); // Gọi hàm onSuccess và truyền dữ liệu trả về từ API vào
      }

      // Đóng modal
      handleClose();
    } else {
      message.error("Tạo mới khách hàng thất bại!"); // Hiển thị thông báo lỗi
    }
  };

  // Khởi tạo các dataSource liên quan
  const dataSource = useKhachHangDataSource();

  // Hàm handleFormValuesChange sẽ được gọi khi giá trị của form thay đổi
  const handleFormValuesChange = async (changedValues, allValues) => {
    if (changedValues.MaQuocGia) {
      // Kiểm tra xem giá trị MaQuocGia có thay đổi không
      await api.getTinhTPByMaQuocGia(changedValues.MaQuocGia).then((res) => {
        // Gọi API lấy danh sách tỉnh/TP
        if (res && res.DataList) {
          // Kiểm tra xem API có trả về dữ liệu không
          const result = res.DataList.map((item) => {
            // Xử lý dữ liệu trả về
            return {
              label: item.TenTinhTp,
              value: item.MaTinhTp,
            };
          });
          form.setFieldValue("ListTinhTP", result); // Set giá trị ListTinhTP vào form
        }
      });
    }

    // Kiểm tra xem giá trị MaTinhTp có thay đổi không
    if (changedValues.MaTinhTp) {
      // Gọi API lấy danh sách quận/huyện
      await api.getQuanHuyenByMaTinhTP(changedValues.MaTinhTp).then((res) => {
        // Gọi API lấy danh sách quận/huyện
        if (res && res.DataList) {
          // Kiểm tra xem API có trả về dữ liệu không
          const result = res.DataList.map((item) => {
            // Xử lý dữ liệu trả về
            return {
              label: item.TenQuanHuyen,
              value: item.MaQuanHuyen,
            };
          });
          form.setFieldValue("ListQuanHuyen", result); // Set giá trị ListQuanHuyen vào form
        }
      });
    }

    // Kiểm tra xem giá trị MaQuanHuyen có thay đổi không
    if (changedValues.MaQuanHuyen) {
      // Gọi API lấy danh sách xã/phường
      await api
        .getPhuongXaByMaQuanHuyen(changedValues.MaQuanHuyen)
        .then((res) => {
          // Gọi API lấy danh sách xã/phường
          if (res && res.DataList) {
            const result = res.DataList.map((item) => {
              return {
                label: item.TenPhuongXa,
                value: item.MaPhuongXa,
              };
            });
            form.setFieldValue("ListPhuongXa", result); // Set giá trị ListPhuongXa vào form
          }
        });
    }
  };

  // Hàm handleClearQuocGia sẽ được gọi khi người dùng nhấn vào nút xóa giá trị của Quốc gia
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

  // Hàm handleClearTinhTP sẽ được gọi khi người dùng nhấn vào nút xóa giá trị của Tỉnh/TP
  const handleClearTinhTP = () => {
    form.setFieldsValue({
      MaTinhTp: null,
      MaQuanHuyen: null,
      MaPhuongXa: null,
      ListQuanHuyen: [],
      ListPhuongXa: [],
    });
  };

  // Hàm handleClearQuanHuyen sẽ được gọi khi người dùng nhấn vào nút xóa giá trị của Quận/Huyện
  const handleClearQuanHuyen = () => {
    form.setFieldsValue({
      MaQuanHuyen: null,
      MaPhuongXa: null,
      ListPhuongXa: [],
    });
  };

  // Hàm handleClearPhuongXa sẽ được gọi khi người dùng nhấn vào nút xóa giá trị của Xã/Phường
  const handleClearPhuongXa = () => {
    form.setFieldsValue({
      MaPhuongXa: null,
    });
  };

  // Sử dụng hook useWatch để lấy giá trị của AnhDaiDienPreview từ form
  const previewImage = useWatch("AnhDaiDienPreview", { form, preserve: true });

  // Hàm handlePreview sẽ được gọi khi người dùng chọn ảnh
  const handlePreview = (info) => {
    if (info.file.response?.Data?.FilePath) {
      form.setFieldsValue({
        AnhDaiDienPreview: info.file.response?.Data?.FilePath,
      });
    }
  };

  // Hàm handleSave sẽ được gọi khi người dùng nhấn vào nút Thêm mới
  const handleSave = () => {
    form.submit();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      width={"80%"}
      closeIcon={false}
      title="Thêm mới khách hàng"
      okText="Thêm mới"
      onOk={handleSave}
    >
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
        style={{
          marginTop: 20,
        }}
      >
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
              <Input />
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
                  <Switch disabled />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});

export default PopupThemMoiKhachHang;
