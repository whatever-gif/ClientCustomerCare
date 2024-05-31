import { useQuery } from "@tanstack/react-query";
import { useApiService } from "../../../../../../../components/service/useApiService";

// Khởi tạo các dataSource dùng trong form báo cáo như lấy ra list người dùng, list phân loại
export const useDataSource = () => {
  // Sử dụng hook useApiService để lấy đối tượng api
  const api = useApiService();

  // Sử dụng hook useQuery để lấy dữ liệu từ server
  const { data: listTrangThaiTicket } = useQuery({
    queryKey: ["listTrangThaiTicket"], // Khóa duy nhất để xác định truy vấn này
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
  const { data: listKhachHang } = useQuery({
    queryKey: ["listKhachHang"], // Khóa duy nhất để xác định truy vấn này
    queryFn: async () => {
      const result = await api.getKhachHangActive(); // Gọi API để lấy dữ liệu khách hàng

      const dataList =
        result.DataList && result.DataList.length > 0 ? result.DataList : []; // Kiểm tra và xử lý dữ liệu trả về

      return dataList.map((item) => {
        return {
          label: item.TenKhachHang,
          value: item.MaKhachHang,
        };
      }); // Chuyển đổi dữ liệu trả về thành định dạng mong muốn
    },
    refetchOnWindowFocus: false, // Không làm mới dữ liệu khi cửa sổ được focus
  });

  // get all người dùng
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

  // get all phân loại ticket
  const { data: listPhanLoaiTicket } = useQuery({
    queryKey: ["listPhanLoaiTicket"],
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
    ListPhanLoaiTicket: listPhanLoaiTicket,
    ListTrangThaiTicket: listTrangThaiTicket,
    ListKhachHang: listKhachHang,
  };
};
