import { useAuthService } from "./components/AuthService";
import { useTicketService } from "./components/EticketService";
import { useKhachHangService } from "./components/KhachHangService";
import { useNguoiDungService } from "./components/NguoiDungService";
import { usePhanLoaiTicketService } from "./components/PhanLoaiTicket";
import { usePhuongXaService } from "./components/PhuongXaService";
import { useQuanHuyenService } from "./components/QuanHuyenService";
import { useTinhTPService } from "./components/TinhTPService";

export const useApiService = () => {
  const tinhTPService = useTinhTPService();
  const quanHuyenService = useQuanHuyenService();
  const phuongXaService = usePhuongXaService();
  const khachHangService = useKhachHangService();
  const authService = useAuthService();
  const eticketService = useTicketService();
  const nguoiDungService = useNguoiDungService();
  const phanLoaiTicket = usePhanLoaiTicketService();

  return {
    ...tinhTPService,
    ...quanHuyenService,
    ...phuongXaService,
    ...khachHangService,
    ...authService,
    ...eticketService,
    ...nguoiDungService,
    ...phanLoaiTicket,
  };
};
