import { useQuery } from "@tanstack/react-query";
import { Divider, Flex, Typography } from "antd";
import React, { useState } from "react";
import { useApiService } from "../../../../components/service/useApiService";
import FormTimKiem from "./components/FormTimKiem/FormTimKiem";
import TableBaoCaoKPI from "./components/TableBaoCaoKPI/TableBaoCaoKPI";

const BaoCaoKPI = () => {
  // Sử dụng hook useState để lưu trữ giá trị của form
  const [formValue, setFormValue] = useState({
    MaPhanLoaiTicket: "",
    ThoiGianTaoTu: null,
    ThoiGianTaoDen: null,
    NguoiTao: "",
    id: "",
  });

  // Sử dụng hook useApiService để lấy đối tượng api
  const api = useApiService();

  // Sử dụng hook useQuery để lấy dữ liệu từ server
  const { data, refetch } = useQuery({
    queryKey: ["nguoidung", formValue], // Khóa duy nhất để xác định truy vấn này
    queryFn: async () => {
      // Hàm thực hiện truy vấn
      const resp = api.reportKPI(formValue); // Gọi API để lấy dữ liệu báo cáo KPI

      return resp; // Trả về dữ liệu từ response
    },
    refetchOnWindowFocus: false, // Không làm mới dữ liệu khi cửa sổ được focus
  });

  // Hàm onFormSubmit sẽ được gọi khi form được submit
  const onFormSubmit = (values) => {
    setFormValue(values); // Lưu giá trị form vào state formValue
  };

  return (
    <Flex vertical>
      <Typography.Text strong style={{ marginTop: 6 }}>
        {" "}
        {/* Hiển thị tiêu đề */}
        Báo cáo KPI xử lý eTicket
      </Typography.Text>
      <Divider style={{ margin: "12px 0" }} />
      <FormTimKiem onFormSubmit={onFormSubmit} /> {/* Hiển thị form tìm kiếm */}
      <Divider style={{ margin: "0 0 12px 0" }} />
      <TableBaoCaoKPI data={data} refetch={refetch} />{" "}
      {/* Hiển thị bảng dữ liệu báo cáo KPI */}
    </Flex>
  );
};

export default BaoCaoKPI;
