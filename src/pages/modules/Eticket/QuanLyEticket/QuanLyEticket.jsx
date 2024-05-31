import { useQuery } from "@tanstack/react-query";
import { Divider, Flex, Typography } from "antd";
import React, { useState } from "react";
import { useApiService } from "../../../../components/service/useApiService";
import FormTimKiem from "./components/FormTimKiem/FormTimKiem";
import TableEticket from "./components/TableEticket/TableEticket";

const QuanLyEticket = () => {
  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  // Sử dụng hook useState để lưu trữ giá trị của form
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

  // Sử dụng hook useQuery để lấy dữ liệu từ server
  const { data, refetch } = useQuery({
    queryKey: ["nguoidung", formValue], // Khóa duy nhất để xác định truy vấn này
    queryFn: async () => {
      const resp = api.searchEticket(formValue); // Gọi API để lấy dữ liệu eTicket

      return resp; // Trả về dữ liệu từ response
    },
    refetchOnWindowFocus: false, // Không làm mới dữ liệu khi cửa sổ được focus
  });

  return (
    <Flex vertical>
      <Typography.Text strong style={{ marginTop: 6 }}>
        {" "}
        {/* Hiển thị tiêu đề */}
        Quản lý eTicket
      </Typography.Text>
      <Divider style={{ margin: "12px 0" }} />
      <FormTimKiem onFormSubmit={setFormValue} /> {/* Hiển thị form tìm kiếm */}
      <Divider style={{ margin: "0 0 12px 0" }} />
      <TableEticket data={data} refetch={refetch} />{" "}
      {/* Hiển thị bảng dữ liệu eTicket */}
    </Flex>
  );
};

export default QuanLyEticket;
