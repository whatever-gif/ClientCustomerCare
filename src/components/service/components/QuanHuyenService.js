import { useConfigApi } from "../../api/useConfigApi";

export const useQuanHuyenService = () => {
  const { get } = useConfigApi();

  const getQuanHuyen = async () => {
    return await get("quanhuyen/search");
  };

  const getQuanHuyenByMaTinhTP = async (maTinhTP) => {
    return await get(`quanhuyen/getByMaTinhTP`, {
      MaTinhTP: maTinhTP,
    });
  };

  return {
    getQuanHuyen,
    getQuanHuyenByMaTinhTP,
  };
};
