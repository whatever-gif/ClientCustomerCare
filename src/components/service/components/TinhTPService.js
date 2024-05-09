import { useConfigApi } from "../../api/useConfigApi";

export const useTinhTPService = () => {
  const { get } = useConfigApi();

  const getTinhTP = async () => {
    return await get("tinhtp/search");
  };

  const getTinhTPByMaQuocGia = async (maQuocGia) => {
    return await get(`tinhtp/getByMaQuocGia`, {
      MaQuocGia: maQuocGia,
    });
  };

  return {
    getTinhTP,
    getTinhTPByMaQuocGia,
  };
};
