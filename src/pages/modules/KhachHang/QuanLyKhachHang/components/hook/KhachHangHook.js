import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetEticket(searchForm) {
  console.log(searchForm);
  return useQuery({
    queryKey: ["Eticket", searchForm],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call

      const data = axios
        .post("https://localhost:7097/api/eticket/search", searchForm)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          return data;
        });

      return Promise.resolve(data);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
