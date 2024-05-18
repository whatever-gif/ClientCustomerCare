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
  const navigate = useNavigate();

  const { currentUser } = useAuthInfo();

  const api = useApiService();

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
    navigate("/dashboard/eticket/add");
  };

  const handleUpdate = (row) => {
    const data = row.original.MaTicket;
    navigate(`/dashboard/eticket/update/${data}`);
  };

  const handleDelete = async (row) => {
    const data = row.original.MaTicket;

    await Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa ticket này không?",
      onOk: async () => {
        const postRequest = {
          MaTicket: data,
          NguoiCapNhat: currentUser.Email,
        };

        const resp = await api.deleteTicket({
          strJson: JSON.stringify(postRequest),
        });
        if (resp.Success) {
          message.success("Xóa ticket thành công!");
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
