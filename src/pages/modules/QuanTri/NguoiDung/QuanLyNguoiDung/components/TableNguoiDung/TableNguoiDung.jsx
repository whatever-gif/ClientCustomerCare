import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Flex, message, Modal } from "antd";
import { download, generateCsv, mkConfig } from "export-to-csv";
import React, { useMemo, useRef } from "react";
import { renderTagColor } from "../../../../../../../components/reuse/RenderTagColor";
import { useApiService } from "../../../../../../../components/service/useApiService";
import CustomTable from "../../../../../../../components/table/CustomTable";
import PopupNguoiDung from "../../../TaoMoiNguoiDung/PopupNguoiDung";

const TableNguoiDung = ({ data, refetch }) => {
  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  const popupRef = useRef(null); // Sử dụng hook useRef để lưu trữ ref của PopupNguoiDung

  // Khai báo các cột của bảng
  const columns = useMemo(
    () => [
      {
        accessorKey: "idx", //access nested data with dot notation
        header: "Số thứ tự",
        size: 100,
        Cell: ({ row }) => {
          return row.index + 1;
        },
      },
      {
        accessorKey: "Email", //access nested data with dot notation
        header: "Mã người dùng",
        size: 250,
        Cell: ({ renderedCellValue }) => {
          return (
            <div
              className="link-primary"
              onClick={() => handleDetail(renderedCellValue)}
            >
              {renderedCellValue}
            </div>
          );
        },
      },
      {
        accessorKey: "TenNguoiDung", //access nested data with dot notation
        header: "Tên người dùng",
        size: 250,
      },
      {
        accessorKey: "SoDienThoai",
        header: "Số điện thoại",
        size: 250,
      },

      {
        accessorKey: "FlagSysAdmin",
        header: "Quản trị hệ thống",
        size: 150,
        Cell: ({ renderedCellValue }) => {
          const flagSysadmin = renderedCellValue == 1 ? "SysAdmin" : null;
          return renderTagColor({
            renderedCellValue: flagSysadmin,
          });
        },
      },

      {
        accessorKey: "TrangThaiHoatDong",
        header: "Trạng thái",
        size: 150,
        Cell: renderTagColor,
      },
    ],
    []
  );

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  }); // Khai báo cấu hình xuất file csv

  const handleExportData = () => {
    // Hàm xuất dữ liệu ra file excel
    const csv = generateCsv(csvConfig)(data?.DataList ?? []); // Xuất dữ liệu thành file csv
    if (csv) {
      download(csvConfig)(csv); // Download file csv
      message.success("Xuất excel thành công!"); // Hiển thị thông báo xuất excel thành công
    } else {
      message.error("Xuất excel thất bại!"); // Hiển thị thông báo xuất excel thất bại
    }
  };

  const handleAdd = () => {
    // Hàm thêm mới người dùng
    if (popupRef.current) {
      // Nếu popupRef hiện tại tồn tại
      popupRef.current?.show({}, "add"); // Hiển thị popup với chế độ thêm mới
    }
  };

  const handleUpdate = async (row) => {
    // Hàm cập nhật người dùng
    const data = row.original; // Lấy dữ liệu người dùng từ dòng được chọn

    const resp = await api.getByEmail({
      // Gọi API để lấy thông tin người dùng
      Email: data.Email, // Truyền email người dùng
    });

    if (resp.Success) {
      // Nếu lấy thông tin thành công
      const detailData = resp.Data; // Lấy dữ liệu chi tiết người dùng
      if (popupRef.current) {
        popupRef.current?.show(
          // Hiển thị popup với dữ liệu chi tiết người dùng
          {
            ...detailData,
            FlagSysAdmin: detailData.FlagSysAdmin == 1 ? true : false,
            TrangThaiHoatDong: detailData.TrangThaiHoatDong == 1 ? true : false,
          },
          "update"
        );
      }
    } else {
      message.error(resp.Error);
    }
  };

  const handleDetail = async (email) => {
    // Hàm xem chi tiết người dùng
    const resp = await api.getByEmail({
      // Gọi API để lấy thông tin người dùng
      Email: email,
    });

    if (resp.Success) {
      const detailData = resp.Data; // Lấy dữ liệu chi tiết người dùng
      if (popupRef.current) {
        popupRef.current?.show(
          {
            ...detailData,
            FlagSysAdmin: detailData.FlagSysAdmin == 1 ? true : false,
            TrangThaiHoatDong: detailData.TrangThaiHoatDong == 1 ? true : false,
          },
          "detail"
        );
      }
    } else {
      message.error(resp.Error);
    }
  };

  const handleDelete = async (row) => {
    // Hàm xóa người dùng
    const data = row.original.Email; // Lấy email người dùng từ dòng được chọn

    await Modal.confirm({
      // Hiển thị modal xác nhận xóa
      title: "Xác nhận xóa", // Tiêu đề modal
      content: "Bạn có chắc chắn muốn xóa người dùng này không?", // Nội dung modal
      onOk: async () => {
        const resp = await api.deleteNguoiDung({
          // Gọi API xóa người dùng
          Email: data,
        });
        if (resp.Success) {
          message.success("Xóa người dùng thành công!"); // Hiển thị thông báo xóa thành công
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
    <>
      <CustomTable
        key={"table_NguoiDung"}
        data={data}
        columns={columns}
        customToolbar={customToolbar}
        customRowActions={customRowActions}
        height={400}
      />
      <PopupNguoiDung ref={popupRef} refetch={refetch} />
    </>
  );
};

export default TableNguoiDung;
