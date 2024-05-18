import { Form, Input, message, Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useAuthInfo } from "../auth/useAuthInfo";
import { customizeRequiredMark } from "../reuse/CustomRequire";
import { useApiService } from "../service/useApiService";

const PopupDoiMatKhau = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const api = useApiService();

  const { currentUser } = useAuthInfo();

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
  }));

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const resp = await api.updateNguoiDungMatKhau({
          strJson: JSON.stringify({
            Email: currentUser.Email,
            MatKhau: values.MatKhauHienTai,
            MatKhauMoi: values.MatKhauMoi,
          }),
        });

        if (resp.Success) {
          message.success("Cập nhật mật khẩu thành công!");
          handleCancel();
        } else {
          message.error(resp.Error);
        }
      })
      .catch((info) => {
        message.error("Vui lòng kiểm tra lại thông tin đã nhập!");
      });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

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

export default PopupDoiMatKhau;
