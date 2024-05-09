import { Avatar, Button, Flex, Form, Input, Modal } from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useAuthInfo } from "../auth/useAuthInfo";
import { customizeRequiredMark } from "../reuse/CustomRequire";
import PopupDoiMatKhau from "./PopupDoiMatKhau";

const PopupNguoiDung = forwardRef(({}, ref) => {
  const [form] = Form.useForm();

  const popupDoiMatKhauRef = useRef();

  const { currentUser } = useAuthInfo();

  useImperativeHandle(ref, () => ({
    show: () => {
      form.setFieldsValue(currentUser);
      setOpen(true);
    },
    hide: () => {
      setOpen(false);
    },
  }));

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePassword = () => {
    popupDoiMatKhauRef.current.show();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      closeIcon={null}
      footer={[
        <Button key="1" type="primary" onClick={handleChangePassword}>
          Đổi mật khẩu
        </Button>,
        <Button key="2" type="primary">
          Chỉnh sửa
        </Button>,
        <Button key="3" onClick={handleClose}>
          Đóng
        </Button>,
      ]}
    >
      <Flex vertical>
        <Form
          form={form}
          autoComplete="off"
          labelWrap
          labelCol={{ span: 6 }}
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
            <Avatar size={100}></Avatar>
          </Form.Item>
          <Form.Item label="Email" name="Email">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Tên người dùng" name="TenNguoiDung">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="SoDienThoai">
            <Input readOnly />
          </Form.Item>
        </Form>
      </Flex>

      <PopupDoiMatKhau ref={popupDoiMatKhauRef} />
    </Modal>
  );
});

export default PopupNguoiDung;
