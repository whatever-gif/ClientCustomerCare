import { useAuthService } from "./components/AuthService";
import { useTicketService } from "./components/EticketService";
import { useGTTTService } from "./components/GTTTService";
import { useKhachHangService } from "./components/KhachHangService";
import { useNguoiDungService } from "./components/NguoiDungService";
import { useNguonKhachService } from "./components/NguonKhachService";
import { usePhanLoaiTicketService } from "./components/PhanLoaiTicket";
import { usePhuongXaService } from "./components/PhuongXaService";
import { useQuanHuyenService } from "./components/QuanHuyenService";
import { useQuocGiaService } from "./components/QuocGiaService";
import { useTinhTPService } from "./components/TinhTPService";
import { useTrangThaiTicketService } from "./components/TrangThaiTicketService";

export const useApiService = () => {
  const tinhTPService = useTinhTPService();
  const quanHuyenService = useQuanHuyenService();
  const phuongXaService = usePhuongXaService();
  const khachHangService = useKhachHangService();
  const authService = useAuthService();
  const eticketService = useTicketService();
  const nguoiDungService = useNguoiDungService();
  const phanLoaiTicketService = usePhanLoaiTicketService();
  const trangThaiTicketService = useTrangThaiTicketService();
  const quocGiaService = useQuocGiaService();
  const gtttService = useGTTTService();
  const nguonKhachService = useNguonKhachService();

  return {
    ...tinhTPService,
    ...quanHuyenService,
    ...phuongXaService,
    ...khachHangService,
    ...authService,
    ...eticketService,
    ...nguoiDungService,
    ...phanLoaiTicketService,
    ...trangThaiTicketService,
    ...quocGiaService,
    ...gtttService,
    ...nguonKhachService,
  };
};
