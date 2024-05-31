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
import { useAuthInfo } from "../../../../../../components/auth/useAuthInfo";
import { renderLinkPrimary } from "../../../../../../components/reuse/RenderLinkPrimary";
import { renderTagColor } from "../../../../../../components/reuse/RenderTagColor";
import { useApiService } from "../../../../../../components/service/useApiService";
import CustomTable from "../../../../../../components/table/CustomTable";

const TableEticket = ({ data, refetch }) => {
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng trang

  const { currentUser } = useAuthInfo(); // Sử dụng hook useAuthInfo để lấy thông tin người dùng hiện tại

  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  // Định nghĩa các cột của bảng
  const columns = useMemo(
    () => [
      {
        accessorKey: "idx", //access nested data with dot notation
        header: "Số thứ tự",
        size: 100,
        // render index of cell
        Cell: ({ row }) => {
          return row.index + 1;
        },
      },
      {
        accessorKey: "MaTicket", //access nested data with dot notation
        header: "Mã eTicket",
        size: 150,
        Cell: ({ renderedCellValue }) => {
          return renderLinkPrimary({
            text: renderedCellValue,
            link: `/dashboard/eticket/detail/${renderedCellValue}`,
          });
        },
      },
      {
        accessorKey: "TenTicket", //access nested data with dot notation
        header: "Tên eTicket",
        size: 150,
      },
      {
        accessorKey: "TenPhanLoaiTicket",
        header: "Phân loại",
        size: 150,
      },
      {
        accessorKey: "TenKhachHang", //normal accessorKey
        header: "Khách hàng",
        size: 200,
      },
      {
        accessorKey: "MaTrangThaiTicket",
        header: "Trạng thái",
        size: 150,
        Cell: renderTagColor,
      },
      {
        accessorKey: "ThoiDiemTiepNhan",
        header: "Thời điểm tiếp nhận",
        size: 150,
      },
    ],
    []
  );

  // Cấu hình cho việc xuất dữ liệu ra file CSV
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  // Hàm xử lý khi người dùng muốn xuất dữ liệu ra file CSV
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data?.DataList ?? []);
    if (csv) {
      download(csvConfig)(csv);
      message.success("Xuất excel thành công!");
    } else {
      message.error("Xuất excel thất bại!");
    }
  };

  // Hàm xử lý khi người dùng muốn tạo mới ticket
  const handleAdd = () => {
    navigate("/dashboard/eticket/add"); // Điều hướng đến trang tạo mới ticket
  };

  // Hàm xử lý khi người dùng muốn cập nhật ticket
  const handleUpdate = (row) => {
    const data = row.original.MaTicket; // Lấy mã ticket
    navigate(`/dashboard/eticket/update/${data}`); // Điều hướng đến trang cập nhật ticket
  };

  // Hàm xử lý khi người dùng muốn xóa ticket
  const handleDelete = async (row) => {
    const data = row.original.MaTicket; // Lấy mã ticket

    await Modal.confirm({
      title: "Xác nhận xóa", // Tiêu đề của modal
      content: "Bạn có chắc chắn muốn xóa ticket này không?", // Nội dung của modal
      onOk: async () => {
        // Hàm xử lý khi người dùng ấn nút Đồng ý

        // Tạo request gửi lên server
        const postRequest = {
          MaTicket: data,
          NguoiCapNhat: currentUser.Email,
        };

        // Gọi API để xóa ticket
        const resp = await api.deleteTicket({
          strJson: JSON.stringify(postRequest),
        });

        // Kiểm tra kết quả trả về
        if (resp.Success) {
          message.success("Xóa ticket thành công!"); // Hiển thị thông báo thành công
          await refetch(); // Gọi hàm refetch để load lại dữ liệu
        } else {
          if (resp.Error) {
            message.error(resp.Error); // Hiển thị thông báo lỗi
          } else {
            message.error("Có lỗi xảy ra"); // Hiển thị thông báo lỗi
          }
        }
      },
      // Cấu hình cho modal
      okButtonProps: {
        style: {
          backgroundColor: "#03884A",
        },
        type: "primary",
      },
      // Cấu hình cho nút Đồng ý
      okText: "Đồng ý",
      // Cấu hình cho nút Hủy
      cancelText: "Hủy",
    });
  };

  // Custom row actions cho bảng
  const customRowActions = ({ row, table }) => (
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

  // Custom toolbar cho bảng
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

  return (
    <CustomTable
      key={"table_Ticket"}
      data={data}
      columns={columns}
      customToolbar={customToolbar}
      customRowActions={customRowActions}
      height={300}
    />
  );
};

export default TableEticket;
