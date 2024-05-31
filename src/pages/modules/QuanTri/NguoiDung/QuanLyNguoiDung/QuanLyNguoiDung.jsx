import { useQuery } from "@tanstack/react-query";
import { Divider, Flex, Typography } from "antd";
import React, { useState } from "react";
import { useApiService } from "../../../../../components/service/useApiService";
import FormTimKiem from "./components/FormTimKiem/FormTimKiem";
import TableNguoiDung from "./components/TableNguoiDung/TableNguoiDung";

const QuanLyNguoiDung = () => {
  const [formValue, setFormValue] = useState({
    Keyword: "",
    id: "",
  }); // Sử dụng hook useState để lưu trữ giá trị của form

  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  const { data, refetch } = useQuery({
    // Sử dụng hook useQuery để lấy dữ liệu từ server
    queryKey: ["nguoidung", formValue], // Khóa duy nhất để xác định truy vấn này
    queryFn: async () => {
      const resp = api.getNguoiDung({
        // Gọi API để lấy dữ liệu người dùng
        Keyword: formValue.Keyword,
      });

      return resp;
    },
    refetchOnWindowFocus: false, // Không làm mới dữ liệu khi cửa sổ được focus
  });

  const onFormSubmit = (values) => {
    // Hàm onFormSubmit sẽ được gọi khi form được submit
    setFormValue(values); // Lưu giá trị form vào state formValue
  };

  return (
    <Flex vertical>
      <Typography.Text strong style={{ marginTop: 6 }}>
        Quản lý người dùng
      </Typography.Text>
      <Divider style={{ margin: "12px 0" }} />
      <FormTimKiem formValue={formValue} onFormSubmit={onFormSubmit} />
      <TableNguoiDung data={data} refetch={refetch} />
    </Flex>
  );
};

export default QuanLyNguoiDung;
