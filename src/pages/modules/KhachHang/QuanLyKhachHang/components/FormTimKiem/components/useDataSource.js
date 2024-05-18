import { useQuery } from "@tanstack/react-query";
import { useApiService } from "../../../../../../../components/service/useApiService";

export const useDataSource = () => {
  const api = useApiService();

  const { data: listNguoiDung } = useQuery({
    queryKey: ["listNguoiDung"],
    queryFn: async () => {
      const result = await api.getNguoiDungActive();

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : [];

      return dataList.map((item) => {
        return {
          label: item.TenNguoiDung,
          value: item.Email,
        };
      });
    },
    refetchOnWindowFocus: false,
  });

  return {
    ListNguoiDung: listNguoiDung,
  };
};
