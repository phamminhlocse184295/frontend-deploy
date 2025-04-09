// export interface Question {
//   id: number;
//   question: string;
//   options: { text: string; skinType: string }[]; // Mỗi câu trả lời liên kết với loại da
// }

// export interface SkinCareProcess {
//   skinType: string;
//   description: string;
//   price: string;
//   steps: {
//     title: string;
//     description: string;
//     media?: string; // Hình ảnh hoặc video
//   }[];
// }
export interface QuizQuestionDto {
  quizquestionId: number;
  content: string;
  questionsId: number;
  quizAnswers: [];
}
