import { Avatar, Button, Flex, Form, Input, message, Modal } from "antd";
import { useWatch } from "antd/es/form/Form";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useAuthInfo } from "../auth/useAuthInfo";
import { customizeRequiredMark } from "../reuse/CustomRequire";
import { useApiService } from "../service/useApiService";
import PopupDoiMatKhau from "./PopupDoiMatKhau";

const PopupNguoiDung = forwardRef(({}, ref) => {
  const [form] = Form.useForm();

  const api = useApiService();

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
    form.resetFields();
  };

  const handleChangePassword = () => {
    popupDoiMatKhauRef.current.show();
  };

  const handleUpdate = async () => {
    // get value of form if form valid
    form
      .validateFields()
      .then(async (values) => {
        const resp = await api.updateNguoiDungThongThuong({
          strJson: JSON.stringify(values)
        });

        if (resp.Success) {
          message.success("Cập nhật thông tin thành công!");

          const userInfo = currentUser;

          userInfo.TenNguoiDung = values.TenNguoiDung;
          userInfo.SoDienThoai = values.SoDienThoai;

          localStorage.setItem("UserInfo", JSON.stringify(userInfo));
        } else {
          message.error(resp.Error);
        }
      })
      .catch(() => {});
  };

  const previewImage = useWatch("Avatar", { form, preserve: true });
  const type = useWatch("Type", { form, preserve: true });

  const handleEdit = () => {
    form.setFieldValue("Type", "edit");
  };

  const handleBack = () => {
    form.setFieldValue("Type", "");
  };

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

export default PopupNguoiDung;
