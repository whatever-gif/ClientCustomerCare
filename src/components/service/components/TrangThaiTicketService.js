import { useConfigApi } from "../../api/useConfigApi";

export const useTrangThaiTicketService = () => {
  const { get } = useConfigApi();

  const getTrangThaiTicket = async () => {
    return await get("trangthaiticket/search");
  };

  return {
    getTrangThaiTicket,
  };
};
