import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RatingDto } from "../dto/rating.dto";

const fetchAllRatings = async (): Promise<RatingDto[]> => {
  const response = await axios.get<RatingDto[]>(
    "https://skincareservicebooking.onrender.com/api/Rating/all"
  );
  return response.data;
};

// 🔍 Lấy rating theo customerId và serviceId
const fetchRatingById = async (
  customerId?: number,
  serviceId?: number
): Promise<number> => {
  if (!customerId || !serviceId) {
    console.warn("❌ Thiếu customerId hoặc serviceId khi fetch rating!");
    return 0;
  }

  try {
    console.log(
      `Fetching rating from: https://localhost:7071/api/Rating/${customerId}/${serviceId}`
    );
    const response = await axios.get<RatingDto>(
      `https://localhost:7071/api/Rating/${customerId}/${serviceId}`
    );
    return response.data?.stars || 0;
  } catch (error) {
    console.error("❌ Lỗi khi lấy đánh giá:", error);
    return 0;
  }
};

export const useRatings = () => {
  return useQuery<RatingDto[], Error>({
    queryKey: ["all"],
    queryFn: fetchAllRatings,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook lấy rating theo customerId và serviceId
export const useRatingById = (customerId?: number, serviceId?: number) => {
  return useQuery<number, Error>({
    queryKey: ["rating", customerId, serviceId],
    queryFn: () => fetchRatingById(customerId, serviceId),
    enabled: Boolean(customerId && serviceId), // Chỉ gọi API nếu có đủ dữ liệu
    staleTime: 1000 * 60 * 5, // Giữ cache trong 5 phút
  });
};
