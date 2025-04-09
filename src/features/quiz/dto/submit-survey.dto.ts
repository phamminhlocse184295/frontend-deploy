export interface SubmitQuizDto {
  customerId: number;
  answers: {
    questionId: number;
    answerId: number;
  }[];
}

export interface SubmitQuizResponse {
  surveyId: number;
  recommendedSkinType: string;
}
