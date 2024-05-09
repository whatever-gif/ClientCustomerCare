import { useQuery } from "@tanstack/react-query";
import { useConfigApi } from "../../../../../../components/api/useConfigApi";

export const useKhachHangDataSource = () => {
  const { get } = useConfigApi();

  const { data: listQuocGia } = useQuery({
    queryKey: ["listQuocGia"],
    queryFn: async () => {
      const result = await get("quocgia/search");

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : [];

      return dataList.map((item) => {
        return {
          label: item.TenQuocGia,
          value: item.MaQuocGia,
        };
      });
    },
    refetchOnWindowFocus: false,
  });

  const { data: listGTTT } = useQuery({
    queryKey: ["listGTTT"],
    queryFn: async () => {
      const result = await get("gttt/search");

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : [];

      return dataList.map((item) => {
        return {
          label: item.TenGTTT,
          value: item.MaGTTT,
        };
      });
    },
    refetchOnWindowFocus: false,
  });

  const { data: listNguonKhach } = useQuery({
    queryKey: ["listNguonKhach"],
    queryFn: async () => {
      const result = await get("nguonkhach/search");

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : [];

      return dataList.map((item) => {
        return {
          label: item.TenNguonKhach,
          value: item.MaNguonKhach,
        };
      });
    },
    refetchOnWindowFocus: false,
  });

  return {
    ListQuocGia: listQuocGia,
    ListGTTT: listGTTT,
    ListNguonKhach: listNguonKhach,
  };
};
