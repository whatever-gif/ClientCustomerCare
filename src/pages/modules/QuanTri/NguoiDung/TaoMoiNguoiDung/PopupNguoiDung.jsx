import { PlusOutlined } from "@ant-design/icons";
import { customizeRequiredMark } from "@components/reuse/CustomRequire";
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
import { useApiService } from "../../../../../components/service/useApiService";

const PopupNguoiDung = forwardRef(({ refetch }, ref) => {
  // Sử dụng hook forwardRef để truy cập ref từ component cha
  useImperativeHandle(ref, () => ({
    // Sử dụng hook useImperativeHandle để truy cập ref từ component cha
    show: (data, type) => {
      // Hàm show sẽ được gọi từ component cha
      setOpen(true);
      setType(type);
      // set form
      form.setFieldsValue({ ...data, AvatarPreview: data.Avatar }); // Set giá trị cho form
    },
  }));

  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  const uploadRef = useRef(); // Sử dụng hook useRef để lưu trữ ref của Upload

  const [form] = Form.useForm(); // Sử dụng hook Form.useForm để tạo form

  const [open, setOpen] = useState(false); // Sử dụng hook useState để lưu trữ trạng thái của modal
  const [type, setType] = useState("add"); // Sử dụng hook useState để lưu trữ loại của modal

  const handleClose = () => {
    // Hàm đóng modal
    setOpen(false); // Đóng modal
    setType(""); // Xóa loại modal
    form.resetFields(); // Reset form
  };

  const handlePreview = (info) => {
    // Hàm xử lý khi chọn ảnh
    if (info.file.response?.Data?.FilePath) {
      // Kiểm tra nếu có đường dẫn ảnh
      form.setFieldsValue({
        // Set giá trị cho form
        AvatarPreview: info.file.response?.Data?.FilePath, // Set giá trị cho trường AvatarPreview
      });
    }
  };

  const previewImage = useWatch("AvatarPreview", { form, preserve: true }); // Sử dụng hook useWatch để lấy giá trị của trường AvatarPreview

  const onFinish = async (values) => {
    // Hàm xử lý khi form được submit
    const postRequset = {
      // Tạo đối tượng postRequset từ dữ liệu form
      Email: values.Email,
      TenNguoiDung: values.TenNguoiDung,
      Avatar: values.AvatarPreview,
      SoDienThoai: values.SoDienThoai,
      MatKhau: values.MatKhau,
      FlagSysAdmin: values.FlagSysAdmin == true ? "1" : "0",
      TrangThaiHoatDong: values.TrangThaiHoatDong == true ? "1" : "0",
    };

    if (type == "add") {
      // Kiểm tra loại modal
      const resp = await api.createNguoiDung({
        // Gọi API để thêm mới người dùng
        strJson: JSON.stringify(postRequset),
      });

      if (resp.Success) {
        // Kiểm tra kết quả trả về
        message.success("Thêm mới người dùng thành công!");
        handleClose();
        refetch();
      } else {
        message.error(resp.Error);
      }
    }

    if (type == "update") {
      // Kiểm tra loại modal
      const resp = await api.updateNguoiDung({
        strJson: JSON.stringify(postRequset), // Gọi API để cập nhật người dùng
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
        style: {
          display: type == "detail" ? "none" : "inline-block",
        },
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
            required={type != "detail"}
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
            <Input disabled={type != "add"} />
          </Form.Item>
          <Form.Item
            label="Tên người dùng"
            name="TenNguoiDung"
            required={type != "detail"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người dùng!",
              },
            ]}
          >
            <Input disabled={type != "add"} />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="SoDienThoai"
            required={type != "detail"}
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
            <Input disabled={type != "add"} />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="MatKhau"
            hidden={type == "detail"}
            required={type != "detail"}
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
