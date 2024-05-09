import { useQuery } from "@tanstack/react-query";
import { Divider, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useConfigApi } from "../../../../components/api/useConfigApi";
import FormTimKiem from "./components/FormTimKiem/FormTimKiem";
import TableKhachHang from "./components/TableKhachHang/TableKhachHang";

const QuanLyKhachHang = () => {
  const { get } = useConfigApi();

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
  });

  const { data, refetch } = useQuery({
    queryKey: ["eticket"],
    queryFn: async () => {
      return get("khachhang/search", formValue);
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [formValue]);

  return (
    <Flex vertical>
      <Typography.Text strong style={{ marginTop: 6 }}>
        Quản lý khách hàng
      </Typography.Text>
      <Divider style={{ margin: "12px 0" }} />
      <FormTimKiem formValue={formValue} onFormSubmit={setFormValue} />
      <Divider style={{ margin: "0 0 12px 0" }} />

      <TableKhachHang data={data} refetch={refetch} />
    </Flex>
  );
};

export default QuanLyKhachHang;
