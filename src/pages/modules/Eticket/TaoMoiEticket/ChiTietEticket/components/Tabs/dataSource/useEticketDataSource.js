import { useQuery } from "@tanstack/react-query";
import { useApiService } from "../../../../../../../../components/service/useApiService";

export const useEticketDataSource = () => {
  const api = useApiService(); // Sử dụng hook useApiService để lấy đối tượng api

  // Sử dụng hook useQuery để lấy dữ liệu từ server
  const { data: listTrangThai } = useQuery({
    queryKey: ["listTrangThai"], // Khóa duy nhất để xác định truy vấn này
    queryFn: async () => {
      const result = await api.getTrangThaiTicket(); // Gọi API để lấy dữ liệu trạng thái ticket

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : []; // Kiểm tra và xử lý dữ liệu trả về

      return dataList.map((item) => {
        return {
          label: item.TenTrangThaiTicket,
          value: item.MaTrangThaiTicket,
        };
      }); // Chuyển đổi dữ liệu trả về thành định dạng mong muốn
    },
    refetchOnWindowFocus: false, // Không làm mới dữ liệu khi cửa sổ được focus
  });

  // Sử dụng hook useQuery để lấy dữ liệu từ server
  const { data: listPhanLoai } = useQuery({
    queryKey: ["listPhanLoai"], // Khóa duy nhất để xác định truy vấn này
    queryFn: async () => {
      const result = await api.getPhanLoaiTicket(); // Gọi API để lấy dữ liệu phân loại ticket

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : []; // Kiểm tra và xử lý dữ liệu trả về

      return dataList.map((item) => {
        return {
          label: item.TenPhanLoaiTicket,
          value: item.MaPhanLoaiTicket,
        };
      }); // Chuyển đổi dữ liệu trả về thành định dạng mong muốn
    },
    refetchOnWindowFocus: false, // Không làm mới dữ liệu khi cửa sổ được focus
  });

  return {
    ListTrangThai: listTrangThai,
    ListPhanLoai: listPhanLoai,
  };
};
