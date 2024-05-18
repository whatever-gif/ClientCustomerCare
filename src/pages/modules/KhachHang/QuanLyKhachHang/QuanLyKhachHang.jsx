import { useQuery } from "@tanstack/react-query";
import { Divider, Flex, Typography } from "antd";
import React, { useState } from "react";
import { useApiService } from "../../../../components/service/useApiService";
import FormTimKiem from "./components/FormTimKiem/FormTimKiem";
import TableKhachHang from "./components/TableKhachHang/TableKhachHang";

const QuanLyKhachHang = () => {
  const api = useApiService();

  const [formValue, setFormValue] = useState({
    MaTicket: "",
    TenTicket: "",
    MaKhachHang: "",
    MaPhanLoaiTicket: "",
    MaTrangThaiTicket: "",
    FlagQuaHanXuLy: "0",
    ThoiGianTaoTu: null,
    ThoiGianTaoDen: null,
    NguoiTao: "",
    id: "",
  });

  const { data, refetch } = useQuery({
    queryKey: ["nguoidung", formValue],
    queryFn: async () => {
      const resp = api.getKhachHang(formValue);

      return resp;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Flex vertical>
      <Typography.Text strong style={{ marginTop: 6 }}>
        Quản lý khách hàng
      </Typography.Text>
      <Divider style={{ margin: "12px 0" }} />
      <FormTimKiem onFormSubmit={setFormValue} />
      <Divider style={{ margin: "0 0 12px 0" }} />
      <TableKhachHang data={data} refetch={refetch} />
    </Flex>
  );
};

export default QuanLyKhachHang;
