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
}) => {
  const { config } = useConfigTable();

  const isFetching = useIsFetching();

  const table = useMaterialReactTable({
    columns: columns,
    data:
      data && data.DataList && data.DataList.length > 0 ? data.DataList : [],
    muiTableContainerProps: {
      sx: {
        height: height,
      },
    },
    ...config,
    initialState: {
      density: "compact",
      pagination: {
        pageIndex: 0,
        pageSize: 100,
      },
    },
    rowNumberDisplayMode: "original",
    getRowId: (row) => row.id,
    renderTopToolbarCustomActions: customToolbar ? customToolbar : null,
    renderRowActions: customRowActions ? customRowActions : null,
    enableRowActions: customRowActions ? true : false,
  });

  return !isFetching && <MaterialReactTable table={table} />;
};

export default CustomTable;
