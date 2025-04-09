import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ServiceDto } from "../dto/get-service.dto";

export const useServiceById = (serviceId: string) => {
  return useQuery<ServiceDto, Error>({
    queryKey: ["getServiceById", serviceId],
    queryFn: async () => {
      const response = await axios.get<ServiceDto>(
        `https://skincareservicebooking.onrender.com/api/service/getServiceById/${serviceId}`
      );
      return response.data;
    },
    enabled: !!serviceId,
  });
};
