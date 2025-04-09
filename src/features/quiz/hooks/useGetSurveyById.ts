/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GetSurveyByIdResponse {
  customersurveyId: number;
  date: string;
  skintypeId: number;
  questionsId: number;
  customerId: number;
  createdAt: string;
}

const getSurveyById = async (id: number): Promise<GetSurveyByIdResponse> => {
  try {
    const response = await axios.get(
      `https://skincareservicebooking.onrender.com/getSurveyById/${id}`,
      {
        headers: { Accept: "application/json" },
      }
    );

    console.log("✅ Dữ liệu nhận từ API (getSurveyById):", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Lỗi khi gọi API getSurveyById:", error);
    throw new Error(
      error.response?.data?.message || "Không thể lấy dữ liệu khảo sát"
    );
  }
};

export const useGetSurveyById = (id: number) => {
  return useQuery<GetSurveyByIdResponse, Error>({
    queryKey: ["survey", id],
    queryFn: () => getSurveyById(id),
    enabled: !!id, // Chỉ gọi API nếu id hợp lệ
  });
};
