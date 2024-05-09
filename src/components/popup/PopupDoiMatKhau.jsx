import { Form, Input, Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const PopupDoiMatKhau = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
  }));

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Success:", values);
        // Here you can call your API to change the password
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="Cập nhật mật khẩu"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} name="CapNhatMatKhau" layout="vertical">
        <Form.Item
          name="MatKhauHienTai"
          label="Mật khẩu hiện tại"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="MatKhauMoi"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="CheckMatKhauMoi"
          label="Confirm New Password"
          dependencies={["MatKhauMoi"]}
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
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
