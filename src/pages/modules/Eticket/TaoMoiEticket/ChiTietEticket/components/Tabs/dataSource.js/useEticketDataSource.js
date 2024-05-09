import { useQuery } from "@tanstack/react-query";
import { useConfigApi } from "../../../../../../../../components/api/useConfigApi";

export const useEticketDataSource = () => {
  const { get } = useConfigApi();

  const { data: listTrangThai } = useQuery({
    queryKey: ["listTrangThai"],
    queryFn: async () => {
      const result = await get("trangthaiticket/search");

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : [];

      return dataList.map((item) => {
        return {
          label: item.TenTrangThaiTicket,
          value: item.MaTrangThaiTicket,
        };
      });
    },
    refetchOnWindowFocus: false,
  });

  const { data: listPhanLoai } = useQuery({
    queryKey: ["listPhanLoai"],
    queryFn: async () => {
      const result = await get("phanloaiticket/search");

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : [];

      return dataList.map((item) => {
        return {
          label: item.TenPhanLoaiTicket,
          value: item.MaPhanLoaiTicket,
        };
      });
    },
    refetchOnWindowFocus: false,
  });

  return {
    ListTrangThai: listTrangThai,
    ListPhanLoai: listPhanLoai,
  };
};
