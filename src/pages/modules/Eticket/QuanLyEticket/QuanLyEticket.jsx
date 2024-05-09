import { useQuery } from "@tanstack/react-query";
import { Divider, Flex, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FormTimKiem from "./components/FormTimKiem/FormTimKiem";
import TableEticket from "./components/TableEticket/TableEticket";

const QuanLyEticket = () => {
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
      return await axios
        .post("https://localhost:7097/api/eticket/search", formValue, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Set the content type
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
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
        Quản lý eTicket
      </Typography.Text>
      <Divider style={{ margin: "12px 0" }} />

      <FormTimKiem formValue={formValue} onFormSubmit={setFormValue} />

      <Divider style={{ margin: "0 0 12px 0" }} />

      <TableEticket data={data} refetch={refetch} />
    </Flex>
  );
};

export default QuanLyEticket;
