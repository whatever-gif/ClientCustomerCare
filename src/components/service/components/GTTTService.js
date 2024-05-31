import { useConfigApi } from "../../api/useConfigApi";

export const useGTTTService = () => {
  const { get } = useConfigApi();

  const getGTTT = async () => {
    return await get("gttt/search");
  };

  return {
    getGTTT,
  };
};
