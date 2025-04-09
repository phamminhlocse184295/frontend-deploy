import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QuizAnswerDto } from "../dto/quiz-answer.dto";

const fetchQuizAnswer = async (): Promise<QuizAnswerDto[]> => {
  const response = await axios.get<QuizAnswerDto[]>(
    "https://skincareservicebooking.onrender.com/api/QuizAnswer"
  );
  return response.data;
};

export const useQuizAnswer = () => {
  return useQuery<QuizAnswerDto[], Error>({
    queryKey: ["QuizAnswer"],
    queryFn: fetchQuizAnswer,
  });
};
