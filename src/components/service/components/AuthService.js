import { useConfigApi } from "../../api/useConfigApi";

export const useAuthService = () => {
  const { get } = useConfigApi();

  const login = async (info) => {
    return await get("auth/login", info);
  };

  return {
    login,
  };
};
