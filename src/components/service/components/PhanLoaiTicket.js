import { useConfigApi } from "../../api/useConfigApi";

export const usePhanLoaiTicketService = () => {
  const { get } = useConfigApi();

  const getPhanLoaiTicket = async () => {
    return await get("phanloaiticket/search");
  };

  return {
    getPhanLoaiTicket,
  };
};
