import { useConfigApi } from "../../api/useConfigApi";

export const useKhachHangService = () => {
  const { get } = useConfigApi();

  const getKhachHang = async (data) => {
    return await get("khachhang/search", data);
  };

  const getKhachHangActive = async () => {
    return await get("khachhang/getActive");
  };

  const createKhachHang = async (data) => {
    return await get("khachhang/create", data);
  };

  const getDetailKhachHang = async (data) => {
    return await get(`khachhang/getByMaKhachHang`, data);
  };

  const getAllInfoKhachHang = async (data) => {
    return await get(`khachhang/getAllInfoByMaKhachHang`, data);
  };

  const updateKhachHang = async (data) => {
    return await get(`khachhang/update`, data);
  };

  const deleteKhachHang = async (data) => {
    return await get(`khachhang/delete`, data);
  };

  return {
    getKhachHang,
    createKhachHang,
    getDetailKhachHang,
    updateKhachHang,
    getAllInfoKhachHang,
    deleteKhachHang,
    getKhachHangActive,
  };
};
