import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RatingDto } from "../dto/rating.dto";

export const useRatingById = (ratingId: number) => {
  return useQuery<RatingDto, Error>({
    queryKey: ["Rating", ratingId],
    queryFn: async () => {
      const response = await axios.get<RatingDto>(
        `https://skincareservicebooking.onrender.com/api/Rating/${ratingId}`
      );
      return response.data;
    },
    enabled: !!ratingId,
  });
};
