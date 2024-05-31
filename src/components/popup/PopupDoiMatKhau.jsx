// Import các component từ thư viện antd
import { Form, Input, message, Modal } from "antd";
// Import các hook từ thư viện react
import React, { forwardRef, useImperativeHandle, useState } from "react";
// Import hook useAuthInfo từ thư mục auth
import { useAuthInfo } from "../auth/useAuthInfo";
// Import hàm customizeRequiredMark từ thư mục reuse
import { customizeRequiredMark } from "../reuse/CustomRequire";
// Import hook useApiService từ thư mục service
import { useApiService } from "../service/useApiService";

// Component PopupDoiMatKhau sử dụng forwardRef để có thể sử dụng ref từ component cha
const PopupDoiMatKhau = forwardRef((props, ref) => {
  // Sử dụng useState để quản lý trạng thái hiển thị của Modal
  const [visible, setVisible] = useState(false);
  // Sử dụng Form.useForm để tạo ra instance của form
  const [form] = Form.useForm();

  // Sử dụng hook useApiService để gọi API
  const api = useApiService();

  // Lấy thông tin người dùng hiện tại từ hook useAuthInfo
  const { currentUser } = useAuthInfo();

  // Sử dụng useImperativeHandle để tạo ra các hàm show và hide có thể gọi từ component cha thông qua ref
  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
  }));

  // Hàm xử lý khi nhấn OK trên Modal
  const handleOk = async () => {
    // Validate form
    form
      .validateFields()
      .then(async (values) => {
        // Gọi API để cập nhật mật khẩu
        const resp = await api.updateNguoiDungMatKhau({
          strJson: JSON.stringify({
            Email: currentUser.Email,
            MatKhau: values.MatKhauHienTai,
            MatKhauMoi: values.MatKhauMoi,
          }),
        });

        // Kiểm tra nếu cập nhật thành công thì hiển thị thông báo và đóng Modal
        if (resp.Success) {
          message.success("Cập nhật mật khẩu thành công!");
          handleCancel();
        } else {
          // Nếu cập nhật thất bại thì hiển thị thông báo lỗi
          message.error(resp.Error);
        }
      })
      .catch((info) => {
        // Nếu validate form thất bại thì hiển thị thông báo lỗi
        message.error("Vui lòng kiểm tra lại thông tin đã nhập!");
      });
  };

  // Hàm xử lý khi nhấn Cancel trên Modal
  const handleCancel = () => {
    // Đóng Modal và reset form
    setVisible(false);
    form.resetFields();
  };

  // Trả về JSX
  return (
    <Modal
      title="Cập nhật mật khẩu"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="CapNhatMatKhau"
        layout="vertical"
        requiredMark={customizeRequiredMark}
      >
        <Form.Item
          name="MatKhauHienTai"
          label="Mật khẩu hiện tại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu hiện tại!",
            },
            {
              min: 6,
              message: "Mật khẩu phải có tối thiểu 6 ký tự!",
            },
            {
              max: 20,
              message: "Mật khẩu chỉ có 20 ký tự tối đa!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="MatKhauMoi"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!",
            },
            {
              min: 6,
              message: "Mật khẩu phải có tối thiểu 6 ký tự!",
            },
            {
              max: 20,
              message: "Mật khẩu chỉ có 20 ký tự tối đa!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="CheckMatKhauMoi"
          label="Nhập lại mật khẩu mới"
          dependencies={["MatKhauMoi"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu mới!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("MatKhauMoi") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu mới và mật khẩu nhập lại không hợp lệ!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
});

// Xuất component PopupDoiMatKhau
export default PopupDoiMatKhau;
