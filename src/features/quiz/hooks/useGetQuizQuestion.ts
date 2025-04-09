import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QuizQuestionDto } from "../dto/quiz-question.dto";

const fetchQuizQuestion = async (): Promise<QuizQuestionDto[]> => {
  const response = await axios.get<QuizQuestionDto[]>(
    "https://skincareservicebooking.onrender.com/api/QuizQuestion"
  );
  return response.data;
};

export const useQuizQuestion = () => {
  return useQuery<QuizQuestionDto[], Error>({
    queryKey: ["QuizQuestion"],
    queryFn: fetchQuizQuestion,
  });
};
