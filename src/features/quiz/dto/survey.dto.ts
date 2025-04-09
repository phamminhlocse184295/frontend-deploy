export interface GetSurveyByIdDto {
  customersurveyId: number; // ID của Customer Survey cần lấy dữ liệu
}

export interface GetSurveyByIdResponse {
  customersurveyId: number;
  date: string; // Ngày thực hiện khảo sát
  skintypeId: number;
  questionsId: number;
  customerId: number;
  createdAt: string; // Ngày tạo bản ghi
}
