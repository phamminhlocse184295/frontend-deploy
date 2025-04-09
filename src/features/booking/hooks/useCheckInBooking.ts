import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Định nghĩa các tham số cần thiết cho Mutation
interface MutationVariables {
  BookingId: number;
}

export const useCheckInBooking = () => {
  const queryClient = useQueryClient();

  // Sử dụng useMutation để thực hiện thao tác check-in
  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({ BookingId }: MutationVariables): Promise<void> => {
      try {
        // Gọi API check-in
        await axios.put(
          `https://skincareservicebooking.onrender.com/api/Booking/checkin/${BookingId}`
        );
      } catch (error) {
        // Xử lý lỗi nếu có khi gọi API
        console.error("Có lỗi khi gọi API:", error);
        throw error; // ném lỗi để onError có thể xử lý
      }
    },
    onSuccess: () => {
      // Nếu thành công, invalidate lại cache để làm mới dữ liệu liên quan đến check-in
      queryClient.invalidateQueries({ queryKey: ["checkin"] });
    },
    onError: (error) => {
      // Hiển thị thông báo lỗi nếu API không thành công
      console.error("Lỗi khi check-in:", error);
      // Có thể thêm message.error ở đây nếu cần
    },
  });
};
