import { useConfigApi } from "../../api/useConfigApi";

export const usePhuongXaService = () => {
  const { get } = useConfigApi();

  const getPhuongXa = async () => {
    return await get("phuongxa/search");
  };

  const getPhuongXaByMaQuanHuyen = async (maQuanHuyen) => {
    return await get(`phuongxa/getByMaQuanHuyen`, {
      MaQuanHuyen: maQuanHuyen,
    });
  };

  return {
    getPhuongXa,
    getPhuongXaByMaQuanHuyen,
  };
};
