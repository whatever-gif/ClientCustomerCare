import { useIsFetching } from "@tanstack/react-query";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React from "react";
import { useConfigTable } from "../config/ConfigTable";

const CustomTable = ({
  columns,
  data,
  customToolbar = null,
  customRowActions = null,
  height = 350,
  hiddenColumn = {}
}) => {
    // Sử dụng hook useConfigTable để lấy config cho table
  const { config } = useConfigTable(); 

    // Sử dụng hook useIsFetching để kiểm tra xem có request nào đang được thực hiện hay không
  const isFetching = useIsFetching();

    // Sử dụng hook useMaterialReactTable để tạo table
  const table = useMaterialReactTable({
    columns: columns,
    data:
      data && data.DataList && data.DataList.length > 0 ? data.DataList : [], // Dữ liệu của table
    muiTableContainerProps: { // Các prop cho container của table
      sx: {
        height: height,
      },
    },
    ...config,  // Sử dụng config từ useConfigTable
    initialState: {  // Trạng thái ban đầu của table
      density: "compact",
      pagination: {
        pageIndex: 0,
        pageSize: 100,
      },
      columnVisibility : hiddenColumn // Các cột bị ẩn
    },
    rowNumberDisplayMode: "original", // Chế độ hiển thị số dòng
    getRowId: (row) => row.id, // Hàm lấy id của dòng
    renderTopToolbarCustomActions: customToolbar ? customToolbar : null, // Hàm render custom toolbar
    renderRowActions: customRowActions ? customRowActions : null, // Hàm render custom row actions
    enableRowActions: customRowActions ? true : false,  // Cho phép row actions hay không
    
  });

  return !isFetching && <MaterialReactTable table={table} />;
};

export default CustomTable;
