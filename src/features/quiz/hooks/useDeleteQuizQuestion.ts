import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteQuizQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number): Promise<void> => {
      await axios.delete(
        `https://skincareservicebooking.onrender.com/api/QuizQuestion/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["QuizQuestion"] });
    },
  });
};
