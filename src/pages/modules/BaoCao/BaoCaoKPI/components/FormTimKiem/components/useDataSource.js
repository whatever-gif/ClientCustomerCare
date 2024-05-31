import { useQuery } from "@tanstack/react-query";
import { useApiService } from "../../../../../../../components/service/useApiService";

// Khởi tạo các dataSource dùng trong form báo cáo như lấy ra list người dùng, list phân loại
export const useDataSource = () => {
  // Sử dụng hook useApiService để lấy đối tượng api
  const api = useApiService();

  // Sử dụng hook useQuery từ thư viện react-query để lấy danh sách người dùng
  const { data: listNguoiDung } = useQuery({
    queryKey: ["listNguoiDung"], // Khóa duy nhất để xác định truy vấn này
    queryFn: async () => {
      // Hàm thực hiện truy vấn
      // Gọi API để lấy danh sách người dùng
      const result = await api.getNguoiDungActive();

      // Kiểm tra và xử lý dữ liệu trả về
      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : [];

      // Chuyển đổi dữ liệu trả về thành định dạng mong muốn
      return dataList.map((item) => {
        return {
          label: item.TenNguoiDung,
          value: item.Email,
        };
      });
    },
    refetchOnWindowFocus: false, // Không làm mới dữ liệu khi cửa sổ được focus
  });

  // Tương tự như trên, nhưng lấy danh sách phân loại
  const { data: listPhanLoai } = useQuery({
    queryKey: ["listPhanLoai"],
    queryFn: async () => {
      const result = await api.getPhanLoaiTicket();

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

  // Trả về dữ liệu đã được xử lý
  return {
    ListNguoiDung: listNguoiDung,
    ListPhanLoai: listPhanLoai,
  };
};
