import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RatingDto } from "../../services/dto/rating.dto";

export const useUpdateRatingById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rating: Partial<RatingDto>) => {
      if (!rating.ratingId) throw new Error("Thiếu ratingId để cập nhật!");

      const response = await axios.put(
        `https://skincareservicebooking.onrender.com/api/Rating/${rating.ratingId}`,
        rating,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Cập nhật rating thành công:", response.data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] }); // 🛠️ Fix lỗi TypeScript
    },
  });
};
