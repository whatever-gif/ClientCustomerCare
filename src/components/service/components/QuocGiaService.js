import { useConfigApi } from "../../api/useConfigApi";

export const useQuocGiaService = () => {
  const { get } = useConfigApi();

  const getQuocGia = async () => {
    return await get("quocgia/search");
  };

  return {
    getQuocGia,
  };
};
