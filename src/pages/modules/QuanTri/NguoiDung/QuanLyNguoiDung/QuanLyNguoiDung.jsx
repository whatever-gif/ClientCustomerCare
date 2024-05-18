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
  });

  const api = useApiService();

  const { data, refetch } = useQuery({
    queryKey: ["nguoidung", formValue],
    queryFn: async () => {
      const resp = api.getNguoiDung({
        Keyword: formValue.Keyword,
      });

      return resp;
    },
    refetchOnWindowFocus: false,
  });

  const onFormSubmit = (values) => {
    setFormValue(values);
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
