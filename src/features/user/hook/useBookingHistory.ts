import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookingDto } from "../../booking/dto/booking.dto";
import { useGetCustomerId } from "../../user/hook/useGetCustomerId";

const API_BASE_URL = "https://skincareservicebooking.onrender.com/api/Booking";

// Hàm fetch dữ liệu booking history
const fetchBookingHistory = async (
  customerId: number
): Promise<BookingDto[]> => {
  if (!customerId || customerId <= 0) {
    throw new Error("Customer ID không hợp lệ");
  }

  try {
    const response = await axios.get<BookingDto[]>(
      `${API_BASE_URL}/previousBooking/${customerId}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("❌ Lỗi khi fetch booking history:", error);
    throw error;
  }
};

// Hook lấy lịch sử đặt lịch, hỗ trợ truyền `customerId` từ ngoài vào
export const useBookingHistory = (overrideCustomerId?: number) => {
  const {
    customerId: defaultCustomerId,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useGetCustomerId();

  // Nếu `overrideCustomerId` có giá trị, ưu tiên sử dụng nó
  const customerId = overrideCustomerId ?? defaultCustomerId;

  console.log("🔍 Customer ID được sử dụng:", customerId);

  // Kiểm tra `customerId` hợp lệ
  const isCustomerIdValid = typeof customerId === "number" && customerId > 0;

  // Nếu `customerId` chưa sẵn sàng, không gọi API
  const bookingQuery = useQuery<BookingDto[], Error>({
    queryKey: ["getBookingHistory", customerId],
    queryFn: () => fetchBookingHistory(customerId!),
    enabled: isCustomerIdValid,
    select: (data) =>
      data.sort((a, b) => {
        if (a.status === "Booked" && b.status !== "Booked") return -1;
        if (a.status !== "Booked" && b.status === "Booked") return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }),
  });

  // Xử lý lỗi trong hook thay vì `onError`
  if (bookingQuery.error) {
    console.error("🚨 Lỗi khi tải lịch sử đặt lịch:", bookingQuery.error);
  }

  return {
    ...bookingQuery,
    isLoading: isCustomerLoading || bookingQuery.isLoading,
    error: customerError || bookingQuery.error,
  };
};
