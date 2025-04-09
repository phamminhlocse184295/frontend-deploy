import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { QuizAnswerDto } from "../dto/quiz-answer.dto";

interface MutationVariables {
  answerId: number;
  data: QuizAnswerDto;
}

export const useUpdateQuizAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      answerId,
      data,
    }: MutationVariables): Promise<void> => {
      await axios.put(
        `https://skincareservicebooking.onrender.com/api/QuizAnswer/${answerId}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["QuizAnswer"] });
    },
  });
};
