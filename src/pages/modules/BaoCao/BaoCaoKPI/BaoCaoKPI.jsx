import { useQuery } from "@tanstack/react-query";
import { Divider, Flex, Typography } from "antd";
import React, { useState } from "react";
import { useApiService } from "../../../../components/service/useApiService";
import FormTimKiem from "./components/FormTimKiem/FormTimKiem";
import TableBaoCaoKPI from "./components/TableBaoCaoKPI/TableBaoCaoKPI";

const BaoCaoKPI = () => {
  const [formValue, setFormValue] = useState({
    MaPhanLoaiTicket: "",
    ThoiGianTaoTu: null,
    ThoiGianTaoDen: null,
    NguoiTao: "",
    id: "",
  });

  const api = useApiService();

  const { data, refetch } = useQuery({
    queryKey: ["nguoidung", formValue],
    queryFn: async () => {
      const resp = api.reportKPI(formValue);

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
        Báo cáo KPI xử lý eTicket
      </Typography.Text>
      <Divider style={{ margin: "12px 0" }} />
      <FormTimKiem onFormSubmit={onFormSubmit} />
      <Divider style={{ margin: "0 0 12px 0" }} />
      <TableBaoCaoKPI data={data} refetch={refetch} />
    </Flex>
  );
};

export default BaoCaoKPI;
