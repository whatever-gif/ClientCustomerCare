import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React from "react";
import { useConfigTable } from "../config/ConfigTable";

const CustomTable = ({
  columns,
  data,
  customToolbar,
  customRowActions,
  height = 350,
}) => {
  const { config } = useConfigTable();

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
    renderTopToolbarCustomActions: customToolbar,
    renderRowActions: customRowActions,
    enableRowActions: true,
  });

  return <MaterialReactTable table={table} />;
};

export default CustomTable;
