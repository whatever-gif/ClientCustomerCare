import { useConfigApi } from "../../api/useConfigApi";

export const useNguonKhachService = () => {
  const { get } = useConfigApi();

  const getNguonKhach = async () => {
    return await get("nguonkhach/search");
  };

  return {
    getNguonKhach,
  };
};
