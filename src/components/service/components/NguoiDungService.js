import { useConfigApi } from "../../api/useConfigApi";

export const useNguoiDungService = () => {
  const { get } = useConfigApi();

  const getNguoiDung = async (info) => {
    return await get("nguoidung/search", info);
  };

  const getNguoiDungActive = async () => {
    return await get("nguoidung/getActive");
  };

  const createNguoiDung = async (info) => {
    return await get("nguoidung/create", info);
  };

  const updateNguoiDung = async (info) => {
    return await get("nguoidung/update", info);
  };

  const getByEmail = async (info) => {
    return await get("nguoidung/getByEmail", info);
  };

  const deleteNguoiDung = async (info) => {
    return await get("nguoidung/delete", info);
  };

  const updateNguoiDungThongThuong = async (info) => {
    return await get("nguoidung/updateNormal", info);
  };

  const updateNguoiDungMatKhau = async (info) => {
    return await get("nguoidung/updatePassword", info);
  };

  return {
    getNguoiDung,
    getNguoiDungActive,
    updateNguoiDung,
    createNguoiDung,
    getByEmail,
    deleteNguoiDung,
    updateNguoiDungThongThuong,
    updateNguoiDungMatKhau,
  };
};
