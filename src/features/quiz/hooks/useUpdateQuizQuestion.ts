import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { QuizQuestionDto } from "../dto/quiz-question.dto";

interface MutationVariables {
  quizquestionId: number;
  data: QuizQuestionDto;
}

export const useUpdateQuizQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      quizquestionId,
      data,
    }: MutationVariables): Promise<void> => {
      await axios.put(
        `https://skincareservicebooking.onrender.com/api/QuizQuestion/${quizquestionId}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["QuizQuestion"] });
    },
  });
};
