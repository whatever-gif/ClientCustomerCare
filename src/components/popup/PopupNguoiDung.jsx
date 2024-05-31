// Import các component từ thư viện antd
import { Avatar, Button, Flex, Form, Input, message, Modal } from "antd";
// Import hook useWatch từ thư viện antd
import { useWatch } from "antd/es/form/Form";
// Import các hook từ thư viện react
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
// Import hook useAuthInfo từ thư mục auth
import { useAuthInfo } from "../auth/useAuthInfo";
// Import hàm customizeRequiredMark từ thư mục reuse
import { customizeRequiredMark } from "../reuse/CustomRequire";
// Import hook useApiService từ thư mục service
import { useApiService } from "../service/useApiService";
// Import component PopupDoiMatKhau từ thư mục hiện tại
import PopupDoiMatKhau from "./PopupDoiMatKhau";

// Component PopupNguoiDung sử dụng forwardRef để có thể sử dụng ref từ component cha
const PopupNguoiDung = forwardRef(({}, ref) => {
  // Sử dụng Form.useForm để tạo ra instance của form
  const [form] = Form.useForm();

  // Sử dụng hook useApiService để gọi API
  const api = useApiService();

  // Tạo ref cho component PopupDoiMatKhau
  const popupDoiMatKhauRef = useRef();

  // Lấy thông tin người dùng hiện tại từ hook useAuthInfo
  const { currentUser } = useAuthInfo();

  // Sử dụng useImperativeHandle để tạo ra các hàm show và hide có thể gọi từ component cha thông qua ref
  useImperativeHandle(ref, () => ({
    show: () => {
      form.setFieldsValue(currentUser);
      setOpen(true);
    },
    hide: () => {
      setOpen(false);
    },
  }));

  // Sử dụng useState để quản lý trạng thái hiển thị của Modal
  const [open, setOpen] = useState(false);

  // Hàm xử lý khi đóng Modal
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  // Hàm xử lý khi nhấn nút Đổi mật khẩu
  const handleChangePassword = () => {
    popupDoiMatKhauRef.current.show();
  };

  // Hàm xử lý khi nhấn nút Lưu
  const handleUpdate = async () => {
    // get value of form if form valid
    form
      .validateFields()
      .then(async (values) => {
        // Gọi API để cập nhật thông tin người dùng
        const resp = await api.updateNguoiDungThongThuong({
          strJson: JSON.stringify(values)
        });

        // Kiểm tra nếu cập nhật thành công thì hiển thị thông báo và đóng Modal
        if (resp.Success) {
          message.success("Cập nhật thông tin thành công!");

          const userInfo = currentUser;

          userInfo.TenNguoiDung = values.TenNguoiDung;
          userInfo.SoDienThoai = values.SoDienThoai;

          localStorage.setItem("UserInfo", JSON.stringify(userInfo));
          handleClose()
        } else {
          // Nếu cập nhật thất bại thì hiển thị thông báo lỗi
          message.error(resp.Error);
        }
      })
      .catch(() => {});
  };

  // Sử dụng hook useWatch để theo dõi giá trị của các trường Avatar và Type trong form
  const previewImage = useWatch("Avatar", { form, preserve: true });
  const type = useWatch("Type", { form, preserve: true });

  // Hàm xử lý khi nhấn nút Chỉnh sửa
  const handleEdit = () => {
    form.setFieldValue("Type", "edit");
  };

  // Hàm xử lý khi nhấn nút Quay lại
  const handleBack = () => {
    form.setFieldValue("Type", "");
  };

  // Tạo footer cho Modal dựa vào giá trị của trường Type trong form
  const footer =
    type == "edit"
      ? [
          <Button key="4" type="primary" onClick={handleUpdate}>
            Lưu
          </Button>,
          <Button key="5" onClick={handleBack}>
            Quay lại
          </Button>,
        ]
      : [
          <Button key="1" type="primary" onClick={handleChangePassword}>
            Đổi mật khẩu
          </Button>,
          <Button key="2" type="primary" onClick={handleEdit}>
            Chỉnh sửa
          </Button>,
          <Button key="3" onClick={handleClose}>
            Đóng
          </Button>,
        ];

  // Trả về JSX
  return (
    <Modal open={open} onCancel={handleClose} closeIcon={null} footer={footer}>
      <Flex vertical>
        <Form
          form={form}
          autoComplete="off"
          labelWrap
          labelCol={{ span: 7 }}
          colon={false}
          requiredMark={customizeRequiredMark}
        >
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar size={100} src={previewImage}></Avatar>
          </Form.Item>
          <Form.Item label="Email" name="Email">
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="Tên người dùng"
            name="TenNguoiDung"
            required={type == "edit"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người dùng!",
              },
            ]}
          >
            <Input readOnly={type != "edit"} />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="SoDienThoai"
            required={type == "edit"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
              {
                pattern: /^[0-9]{9,20}$/,
                message: "Vui lòng nhập định dạng số điện thoại!",
              },
            ]}
          >
            <Input readOnly={type != "edit"} />
          </Form.Item>
        </Form>
      </Flex>

      <PopupDoiMatKhau ref={popupDoiMatKhauRef} />
    </Modal>
  );
});

// Xuất component PopupNguoiDung
export default PopupNguoiDung;