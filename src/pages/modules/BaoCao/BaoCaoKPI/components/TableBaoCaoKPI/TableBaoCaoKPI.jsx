import { Pie } from "@ant-design/charts";
import { DownloadOutlined } from "@ant-design/icons";
import { useIsFetching } from "@tanstack/react-query";
import { Button, Flex, message } from "antd";
import { download, generateCsv, mkConfig } from "export-to-csv";
import React, { useMemo } from "react";
import CustomTable from "../../../../../../components/table/CustomTable";

const TableBaoCaoKPI = ({ data, refetch }) => {
  // Sử dụng hook useIsFetching để kiểm tra trạng thái fetching
  const isFetching = useIsFetching();

  // Định nghĩa các cột của bảng
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
        accessorKey: "TenNguoiDung",
        header: "Tên người dùng",
      },
      {
        accessorKey: "TenPhanLoaiTicket",
        header: "Phân loại",
      },
      {
        accessorKey: "SoLuongTicket",
        header: "Tổng SL eTicket",
      },
      {
        accessorKey: "SoLuongTicketSolved",
        header: "SL eTicket được hỗ trợ (Solved)",
      },
      {
        accessorKey: "SoLuongTicketClosed",
        header: "SL eTicket không thể hỗ trợ (Closed)",
      },
      {
        accessorKey: "TyLeDapUng",
        header: "Tỷ lệ đáp ứng KPI",
        Cell: ({ renderedCellValue }) => {
          return <span>{renderedCellValue}%</span>;
        },
        // size: 50,
      },
    ],
    []
  );

  // Cấu hình cho việc xuất dữ liệu ra file CSV
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: "Báo cáo KPI xử lý eTicket",
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

  // Custom toolbar cho bảng
  const customToolbar = () => {
    return (
      <Flex gap={10}>
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

  // Tính toán tỷ lệ phần trăm
  const resultPercent = data?.DataList
    ? data.DataList.reduce(
        (prev, current) => {
          prev.total += current.SoLuongTicket;
          prev.solved += current.SoLuongTicketSolved;
          prev.closed += current.SoLuongTicketClosed;
          return prev;
        },
        {
          total: 0,
          solved: 0,
          closed: 0,
        }
      )
    : {
        total: 0,
        solved: 0,
        closed: 0,
      };

  // Tính toán tỷ lệ đáp ứng
  const solved =
    ((resultPercent.solved / resultPercent.total) * 100).toFixed(2) ?? 0;

  // Tính toán tỷ lệ không đáp ứng
  const notSolved =
    (
      ((resultPercent.total - resultPercent.solved) / resultPercent.total) *
      100
    ).toFixed(2) ?? 0;

  // Cấu hình cho biểu đồ Pie
  const config = {
    data: [
      {
        type: "Tỷ lệ không đáp ứng KPI",
        value: Number(notSolved),
      },
      { type: "Tỷ lệ đáp ứng KPI", value: Number(solved) },
    ],

    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      size: 12,
      color: {
        type: "legends",
        position: "bottom",
      },
    },
    width: 250,
    height: 400,
  };

  return (
    <Flex gap={12}>
      <div
        style={{
          width: "calc(100% - 300px)",
        }}
      >
        <CustomTable
          key={"table_NguoiDung"}
          data={data}
          columns={columns}
          height={350}
          customToolbar={customToolbar}
        />
      </div>
      {!isFetching && (
        <Pie
          {...config}
          autoFit={true}
          scale={{
            color: {
              palette: "sinebow",
            },
          }}
        />
      )}
    </Flex>
  );
};

export default TableBaoCaoKPI;
