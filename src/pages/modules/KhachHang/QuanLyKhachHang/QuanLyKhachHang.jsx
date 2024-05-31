import { useQuery } from "@tanstack/react-query";
import { Divider, Flex, Typography } from "antd";
import React, { useState } from "react";
import { useApiService } from "../../../../components/service/useApiService";
import FormTimKiem from "./components/FormTimKiem/FormTimKiem";
import TableKhachHang from "./components/TableKhachHang/TableKhachHang";

const QuanLyKhachHang = () => {
  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  const [formValue, setFormValue] = useState({
    // Sử dụng hook useState để lưu trữ giá trị của form
    MaKhachHang: "",
    ThoiGianTaoTu: null,
    ThoiGianTaoDen: null,
    NguoiTao: "",
    Email: "",
    TenKhachHang: "",
    SoDienThoai: "",
    id: "",
  });

  const { data, refetch } = useQuery({
    // Sử dụng hook useQuery để lấy dữ liệu từ server
    queryKey: ["khachhang", formValue],
    queryFn: async () => {
      const resp = api.getKhachHang(formValue); // Gọi API để lấy dữ liệu khách hàng

      return resp; // Trả về dữ liệu từ response
    },
    refetchOnWindowFocus: false, // Không làm mới dữ liệu khi cửa sổ được focus
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
