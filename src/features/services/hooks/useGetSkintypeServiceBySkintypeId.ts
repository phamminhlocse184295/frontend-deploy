import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SkintypeServiceDto } from "../dto/skintype-service.dto";

export const useSkintypeServiceBySkintypeId = (skintypeId: string) => {
  return useQuery<SkintypeServiceDto, Error>({
    queryKey: ["getSkintypeServiceBySkintypeId", skintypeId],
    queryFn: async () => {
      const response = await axios.get<SkintypeServiceDto>(
        `https://skincareservicebooking.onrender.com/getSkintypeServiceBySkintypeId/${skintypeId}`
      );
      return response.data;
    },
    enabled: !!skintypeId,
  });
};
