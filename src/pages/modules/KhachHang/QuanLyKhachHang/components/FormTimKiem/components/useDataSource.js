import { useQuery } from "@tanstack/react-query";
import { useApiService } from "../../../../../../../components/service/useApiService";

export const useDataSource = () => {
  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  const { data: listNguoiDung } = useQuery({
    // Sử dụng hook useQuery để lấy dữ liệu từ server
    queryKey: ["listNguoiDung"], // Khóa duy nhất để xác định truy vấn này
    queryFn: async () => {
      // Hàm thực hiện truy vấn
      const result = await api.getNguoiDungActive(); // Gọi API để lấy danh sách người dùng

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : []; // Lấy danh sách người dùng từ response

      return dataList.map((item) => {
        // Trả về danh sách người dùng
        return {
          label: item.TenNguoiDung,
          value: item.Email,
        };
      });
    },
    refetchOnWindowFocus: false, // Không làm mới dữ liệu khi cửa sổ được focus
  });

  return {
    ListNguoiDung: listNguoiDung,
  };
};
