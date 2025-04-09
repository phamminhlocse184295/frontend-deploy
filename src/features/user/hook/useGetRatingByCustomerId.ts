import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RatingDto } from "../../services/dto/rating.dto";

export const useGetRatingByCustomerId = (customerId?: number) => {
  return useQuery<RatingDto[]>({
    queryKey: ["ratings", customerId],
    queryFn: async () => {
      if (!customerId) return [];
      const response = await axios.get(
        `https://skincareservicebooking.onrender.com/api/Rating/customer/${customerId}`
      );
      return response.data;
    },
    enabled: !!customerId, // Chỉ gọi API khi có customerId
  });
};
