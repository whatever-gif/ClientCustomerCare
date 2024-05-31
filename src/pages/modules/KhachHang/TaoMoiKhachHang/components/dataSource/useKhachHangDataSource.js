import { useQuery } from "@tanstack/react-query";
import { useApiService } from "../../../../../../components/service/useApiService";

export const useKhachHangDataSource = () => {
  const api = useApiService();

  const { data: listQuocGia } = useQuery({
    // Sử dụng hook useQuery để lấy dữ liệu từ server
    queryKey: ["listQuocGia"],
    queryFn: async () => {
      const result = await api.getQuocGia(); // Gọi API để lấy danh sách quốc gia

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
      const result = await api.getGTTT();

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
      const result = await api.getNguonKhach();

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
