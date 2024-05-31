import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, message, Modal } from "antd";
import { download, generateCsv, mkConfig } from "export-to-csv";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { renderLinkPrimary } from "../../../../../../components/reuse/RenderLinkPrimary";
import { renderTagColor } from "../../../../../../components/reuse/RenderTagColor";
import { useApiService } from "../../../../../../components/service/useApiService";
import CustomTable from "../../../../../../components/table/CustomTable";

const TableKhachHang = ({ data, refetch }) => {
  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  // Khai báo các cột của bảng
  const columns = useMemo(
    () => [
      {
        accessorKey: "idx", //access nested data with dot notation
        header: "STT",
        size: 50,
        Cell: ({ row }) => {
          return row.index + 1;
        },
      },
      {
        accessorKey: "AnhDaiDien",
        header: "Ảnh đại diện",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <Avatar src={renderedCellValue} size="small" />
        ),
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
        accessorKey: "NgaySinh",
        header: "Ngày sinh",
        size: 150,
      },
      {
        accessorKey: "TenQuocGia",
        header: "Quốc gia",
        size: 150,
      },
      {
        accessorKey: "TenTinhTP",
        header: "Tỉnh TP",
        size: 150,
      },
      {
        accessorKey: "TenQuanHuyen",
        header: "Quận huyện",
        size: 150,
      },
      {
        accessorKey: "TenPhuongXa",
        header: "Phường xã",
        size: 150,
      },
      {
        accessorKey: "Email", //normal accessorKey
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "DiaChi",
        header: "Địa chỉ",
        size: 150,
      },
      {
        accessorKey: "SoGTTT",
        header: "Số GTTT",
        size: 150,
      },
      {
        accessorKey: "TenGTTT",
        header: "Loại GTTT",
        size: 150,
      },
      {
        accessorKey: "NgheNghiep",
        header: "Nghề nghiệp",
        size: 150,
      },
      {
        accessorKey: "TenNguonKhach",
        header: "Nguồn khách",
        size: 150,
      },

      {
        accessorKey: "NgayTao",
        header: "Ngày tạo",
        size: 150,
      },
      {
        accessorKey: "TenNguoiDung",
        header: "Người tạo",
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

  // Khai báo các cột ẩn
  const hiddenColumn = {
    NgaySinh: false,
    TenQuocGia: false,
    TenTinhTP: false,
    TenQuanHuyen: false,
    TenPhuongXa: false,
    SoGTTT: false,
    TenGTTT: false,
    NgheNghiep: false,
    TenNguonKhach: false,
    AnhDaiDien: false,
    NgayTao: false,
    TenNguoiDung: false,
  };

  // Sử dụng hook useNavigate để điều hướng trang
  const navigate = useNavigate();

  // Khai báo cấu hình xuất excel
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: "Danh sách khách hàng",
  });

  // Hàm xuất excel
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data?.DataList ?? []); // Xuất dữ liệu thành file csv
    if (csv) {
      download(csvConfig)(csv);
      message.success("Xuất excel thành công!");
    } else {
      message.error("Xuất excel thất bại!");
    }
  };

  const handleAdd = () => {
    // Hàm thêm mới
    navigate("/dashboard/khachhang/add"); // Điều hướng đến trang thêm mới
  };

  // Hàm cập nhật
  const handleUpdate = (row) => {
    // Hàm cập nhật
    const data = row.original.MaKhachHang; // Lấy mã khách hàng từ dòng được chọn
    navigate(`/dashboard/khachhang/update/${data}`); // Điều hướng đến trang cập nhật
  };

  const handleDelete = async (row) => {
    // Hàm xóa
    const data = row.original.MaKhachHang; // Lấy mã khách hàng từ dòng được chọn

    await Modal.confirm({
      // Hiển thị modal xác nhận xóa
      title: "Xác nhận xóa", // Tiêu đề modal
      content: "Bạn có chắc chắn muốn xóa khách hàng này không?", // Nội dung modal
      onOk: async () => {
        const resp = await api.deleteKhachHang({
          // Gọi API xóa khách hàng
          MaKhachHang: data, // Truyền mã khách hàng cần xóa
        });
        if (resp.Success) {
          // Nếu xóa thành công
          message.success("Xóa khách hàng thành công!"); // Hiển thị thông báo xóa thành công
          await refetch(); // Gọi hàm refetch để load lại dữ liệu
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

  // Hàm tạo custom toolbar
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

  // Hàm tạo custom row actions
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
      height={350}
      hiddenColumn={hiddenColumn}
    />
  );
};

export default TableKhachHang;
