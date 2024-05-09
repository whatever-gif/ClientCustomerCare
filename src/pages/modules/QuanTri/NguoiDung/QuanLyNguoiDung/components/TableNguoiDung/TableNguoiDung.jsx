import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import {
  Button,
  Flex,
  Form,
  Input,
  Select,
  Switch,
  Tag,
  Typography,
  Upload,
} from "antd";
import { download, generateCsv, mkConfig } from "export-to-csv";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo } from "react";
import "../TableNguoiDung/TableNguoiDung.scss";
import { configTable } from "./../../../../../../../components/config/ConfigTable";
import { customizeRequiredMark } from "./../../../../../../../components/reuse/CustomRequire";

const data = Array.from({ length: 1000 }, (v, i) => {
  return {
    MaNguoiDung: faker.internet.userName(),
    TenNguoiDung: faker.person.fullName(),
    NgaySinh: faker.date.past(),
    DiaChi: faker.location.streetAddress(),
    Email: faker.internet.email(),
    SoDienThoai: faker.phone.number(),
    TrangThai: 1,
    idx: i + 1,
  };
});

const TableNguoiDung = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "idx", //access nested data with dot notation
        header: "Số thứ tự",
        size: 100,
      },
      {
        accessorKey: "MaNguoiDung", //access nested data with dot notation
        header: "Mã khách hàng",
        size: 150,
      },
      {
        accessorKey: "TenNguoiDung", //access nested data with dot notation
        header: "Tên khách hàng",
        size: 150,
      },
      {
        accessorKey: "SoDienThoai",
        header: "Số điện thoại",
        size: 150,
      },
      {
        accessorKey: "Email", //normal accessorKey
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "DiaChi",
        header: "Địa chỉ",
        size: 150,
      },
      {
        accessorKey: "TrangThai",
        header: "Trạng thái",
        size: 150,
        Cell: ({ renderedCellValue }) => {
          return renderedCellValue == 1 ? (
            <Tag color="#87d068">Hoạt động</Tag>
          ) : (
            <Tag color="#bebebe">Không hoạt động</Tag>
          );
        },
      },
    ],
    []
  );

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    ...configTable,

    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    renderRowActions: ({ row, table }) => (
      <Flex gap={10}>
        <Button
          type="primary"
          onClick={() => table.editRow(row)}
          size="middle"
          style={{
            backgroundColor: "#1890ff",
          }}
          icon={<EditOutlined />}
        ></Button>
        <Button
          type="primary"
          danger
          onClick={() => table.deleteRow(row)}
          size="middle"
          icon={<DeleteOutlined />}
        ></Button>
      </Flex>
    ),
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => {
      return (
        <Flex
          vertical
          style={{
            padding: 10,
          }}
        >
          <Typography.Title level={3}>Tạo mới người dùng</Typography.Title>

          <Form
            id="TaoMoiNguoiDung"
            labelWrap
            colon={false}
            requiredMark={customizeRequiredMark}
          >
            <Form.Item>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                // beforeUpload={beforeUpload}
                // onChange={handleChange}
              >
                {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Avatar</div>
                </button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Email"
              required
              rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên người dùng"
              required
              rules={[
                { required: true, message: "Vui lòng nhập tên người dùng!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              required
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              required
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Phân quyền"
              required
              rules={[{ required: true, message: "Vui lòng chọn phân quyền!" }]}
            >
              <Select />
            </Form.Item>
            <Form.Item label="Quản trị hệ thống">
              <Switch />
            </Form.Item>
            <Form.Item label="Trạng thái">
              <Switch />
            </Form.Item>
            <Flex justify="end" gap={10}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
              <Button onClick={() => table.setCreatingRow(false)}>Thoát</Button>
            </Flex>
          </Form>
        </Flex>
      );
    },
    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <Flex gap={10}>
          <Button
            icon={<PlusOutlined />}
            dir="rtl"
            type="primary"
            onClick={() => table.setCreatingRow(true)}
          >
            Tạo mới
          </Button>
          <Button
            onClick={handleExportData}
            icon={<DownloadOutlined />}
            dir="rtl"
            type="primary"
          >
            Xuất excel
          </Button>
        </Flex>
      );
    },
  });

  return (
    <MaterialReactTable
      table={table}

    />
  );
};

export default TableNguoiDung;
