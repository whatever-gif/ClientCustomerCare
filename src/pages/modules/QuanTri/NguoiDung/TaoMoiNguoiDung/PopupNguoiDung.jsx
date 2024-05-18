import { PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Switch,
  Upload,
} from "antd";
import { useWatch } from "antd/es/form/Form";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { customizeRequiredMark } from "../../../../../components/reuse/CustomRequire";
import { useApiService } from "../../../../../components/service/useApiService";

const PopupNguoiDung = forwardRef(({ refetch }, ref) => {
  useImperativeHandle(ref, () => ({
    show: (data, type) => {
      setOpen(true);
      setType(type);
      // set form
      form.setFieldsValue({ ...data, AvatarPreview: data.Avatar });
    },
  }));

  const api = useApiService();

  const uploadRef = useRef();

  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("add");

  const handleClose = () => {
    setOpen(false);
    setType("");
    form.resetFields();
  };

  const handlePreview = (info) => {
    if (info.file.response?.Data?.FilePath) {
      form.setFieldsValue({
        AvatarPreview: info.file.response?.Data?.FilePath,
      });
    }
  };

  const previewImage = useWatch("AvatarPreview", { form, preserve: true });

  const onFinish = async (values) => {
    const postRequset = {
      Email: values.Email,
      TenNguoiDung: values.TenNguoiDung,
      Avatar: values.AvatarPreview,
      SoDienThoai: values.SoDienThoai,
      MatKhau: values.MatKhau,
      FlagSysAdmin: values.FlagSysAdmin == true ? "1" : "0",
      TrangThaiHoatDong: values.TrangThaiHoatDong == true ? "1" : "0",
    };

    if (type == "add") {
      const resp = await api.createNguoiDung({
        strJson: JSON.stringify(postRequset),
      });

      if (resp.Success) {
        message.success("Thêm mới người dùng thành công!");
        handleClose();
        refetch();
      } else {
        message.error(resp.Error);
      }
    }

    if (type == "update") {
      const resp = await api.updateNguoiDung({
        strJson: JSON.stringify(postRequset),
      });

      if (resp.Success) {
        message.success("Cập nhật người dùng thành công!");
        handleClose();
        refetch();
      } else {
        message.error(resp.Error);
      }
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      okText="Lưu"
      cancelText="Thoát"
      onOk={() => form.submit()}
      okButtonProps={{
        hidden: type == "detail",
      }}
    >
      <Flex vertical>
        <Form
          initialValues={{
            FlagSysAdmin: false,
            TrangThaiHoatDong: true,
          }}
          form={form}
          autoComplete="off"
          labelWrap
          labelCol={{ span: 7 }}
          colon={false}
          requiredMark={customizeRequiredMark}
          onFinish={onFinish}
        >
          <Form.Item>
            <Flex align="center" justify="center">
              <Form.Item name="AvatarPreview" hidden></Form.Item>
              <Flex vertical gap={10}>
                <Avatar size={100} src={previewImage}></Avatar>
                {type != "detail" && (
                  <Upload
                    ref={uploadRef}
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
                )}
              </Flex>
            </Flex>
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
            required
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
              {
                type: "email",
                message: "Email không đúng định dạng!",
              },
            ]}
          >
            <Input readOnly={type == "detail"} />
          </Form.Item>
          <Form.Item
            label="Tên người dùng"
            name="TenNguoiDung"
            required
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người dùng!",
              },
            ]}
          >
            <Input readOnly={type == "detail"} />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="SoDienThoai"
            required
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
            <Input readOnly={type == "detail"} />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="MatKhau"
            required
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
              {
                max: 20,
                message: "Mật khẩu không được quá 20 ký tự!",
              },
            ]}
          >
            <Input readOnly={type == "detail"} />
          </Form.Item>
          <Form.Item label="Quản trị hệ thống" name="FlagSysAdmin">
            <Switch disabled={type == "detail"} />
          </Form.Item>
          <Form.Item label="Trạng thái" name="TrangThaiHoatDong">
            <Switch disabled={type != "update"} />
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  );
});

export default PopupNguoiDung;
