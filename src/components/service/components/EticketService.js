import { useConfigApi } from "../../api/useConfigApi";

export const useTicketService = () => {
  const { get } = useConfigApi();

  const getByMaTicket = async (data) => {
    return await get("eticket/getByMaTicket", data);
  };

  const createProcess = async (data) => {
    return await get("eticket/createProcess", data);
  };

  const createTicket = async (data) => {
    return await get("eticket/create", data);
  };

  const updateTicket = async (data) => {
    return await get("eticket/update", data);
  };

  const updateTrangThaiTicket = async (data) => {
    return await get("eticket/updateTrangThai", data);
  };

  const deleteTicket = async (data) => {
    return await get("eticket/delete", data);
  };

  const deleteProcess = async (data) => {
    return await get("eticket/deleteProcess", data);
  };

  return {
    getByMaTicket,
    createProcess,
    createTicket,
    updateTicket,
    updateTrangThaiTicket,
    deleteTicket,
    deleteProcess,
  };
};
