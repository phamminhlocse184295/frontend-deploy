import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RatingDto } from "../dto/rating.dto";

export const useRatingByServiceId = (serviceId: number) => {
  return useQuery<RatingDto, Error>({
    queryKey: ["service", serviceId],
    queryFn: async () => {
      const response = await axios.get<RatingDto>(
        `https://skincareservicebooking.onrender.com/api/Rating/service/${serviceId}`
      );
      return response.data;
    },
    enabled: !!serviceId,
  });
};
