import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Flex, message, Modal } from "antd";
import { download, generateCsv, mkConfig } from "export-to-csv";
import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { renderTagColor } from "../../../../../../../components/reuse/RenderTagColor";
import { useApiService } from "../../../../../../../components/service/useApiService";
import CustomTable from "../../../../../../../components/table/CustomTable";
import PopupNguoiDung from "../../../TaoMoiNguoiDung/PopupNguoiDung";

const TableNguoiDung = ({ data, refetch }) => {
  const api = useApiService();

  const popupRef = useRef(null);

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
          return <div className="link-primary" onClick={() => handleDetail(renderedCellValue)}>{renderedCellValue}</div>;
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
    if (popupRef.current) {
      popupRef.current?.show({}, "add");
    }
  };

  const handleUpdate = async (row) => {
    const data = row.original;

    const resp = await api.getByEmail({
      Email: data.Email,
    });

    if (resp.Success) {
      const detailData = resp.Data;
      if (popupRef.current) {
        popupRef.current?.show(
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
    const resp = await api.getByEmail({
      Email: email,
    });

    if (resp.Success) {
      const detailData = resp.Data;
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
    const data = row.original.Email;

    await Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa người dùng này không?",
      onOk: async () => {
        const resp = await api.deleteNguoiDung({
          Email: data,
        });
        if (resp.Success) {
          message.success("Xóa người dùng thành công!");
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
