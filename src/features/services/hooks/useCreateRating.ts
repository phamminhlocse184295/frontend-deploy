import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RatingDto } from "../dto/rating.dto";

export const useCreateRating = () => {
  return useMutation({
    mutationFn: async (newRating: RatingDto) => {
      const response = await axios.post(
        `https://skincareservicebooking.onrender.com/api/Rating`,
        newRating
      );
      return response.data;
    },
  });
};
