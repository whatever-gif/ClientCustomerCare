import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Flex, message, Modal } from "antd";
import { download, generateCsv, mkConfig } from "export-to-csv";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { renderLinkPrimary } from "../../../../../../components/reuse/RenderLinkPrimary";
import { renderTagColor } from "../../../../../../components/reuse/RenderTagColor";
import { useApiService } from "../../../../../../components/service/useApiService";
import CustomTable from "../../../../../../components/table/CustomTable";

const TableKhachHang = ({ data, refetch }) => {
  const api = useApiService();

  const columns = useMemo(
    () => [
      {
        accessorKey: "idx", //access nested data with dot notation
        header: "Số thứ tự",
        size: 120,
        Cell: ({ row }) => {
          return row.index + 1;
        },
      },
      {
        accessorKey: "MaKhachHang", //access nested data with dot notation
        header: "Mã khách hàng",
        size: 150,
        Cell: ({ renderedCellValue }) => {
          return renderLinkPrimary({
            text: renderedCellValue,
            link: `/dashboard/khachhang/detail/${renderedCellValue}`,
          });
        },
      },
      {
        accessorKey: "TenKhachHang", //access nested data with dot notation
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
        Cell: renderTagColor,
      },
    ],
    []
  );

  const navigate = useNavigate();

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data?.DataList ?? []);
    if (csv) {
      download(csvConfig)(csv);
      message.success("Xuất excel thành công!");
    } else {
      message.error("Xuất excel thất bại!");
    }
  };

  const handleAdd = () => {
    navigate("/dashboard/khachhang/add");
  };

  const handleUpdate = (row) => {
    const data = row.original.MaKhachHang;
    navigate(`/dashboard/khachhang/update/${data}`);
  };

  const handleDelete = async (row) => {
    const data = row.original.MaKhachHang;

    await Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa khách hàng này không?",
      onOk: async () => {
        const resp = await api.deleteKhachHang({
          MaKhachHang: data,
        });
        if (resp.Success) {
          message.success("Xóa khách hàng thành công!");
          await refetch();
        } else {
          if (resp.Error) {
            message.error(resp.Error);
          } else {
            message.error("Có lỗi xảy ra");
          }
        }
      },
      okButtonProps: {
        style: {
          backgroundColor: "#03884A",
        },
        type: "primary",
      },
      okText: "Đồng ý",
      cancelText: "Hủy",
    });
  };

  const customToolbar = () => {
    return (
      <Flex gap={10}>
        <Button
          icon={<PlusOutlined />}
          dir="rtl"
          type="primary"
          onClick={handleAdd}
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
  };

  const customRowActions = ({ row, table, cell }) => {
    return (
      <Flex
        justify="space-around"
        align="center"
        style={{
          width: "100%",
        }}
      >
        <EditOutlined onClick={() => handleUpdate(row)} />
        <DeleteOutlined
          onClick={() => handleDelete(row)}
          style={{
            color: "#ff4d4f",
          }}
        />
      </Flex>
    );
  };

  return (
    <CustomTable
      key={"table_KhachHang"}
      data={data}
      columns={columns}
      customToolbar={customToolbar}
      customRowActions={customRowActions}
      height={400}
    />
  );
};

export default TableKhachHang;
