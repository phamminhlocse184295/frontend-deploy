import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL =
  "https://6670d16d0900b5f8724babe3.mockapi.io/api/v1/studentManagement";

// Hook xóa người dùng
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string): Promise<void> => {
      await axios.delete(`${API_BASE_URL}/${id}`);
    },
    onSuccess: () => {
      // Sử dụng object với queryKey để đảm bảo tính đúng đắn trong react-query v4
      queryClient.invalidateQueries({ queryKey: ["studentManagement"] });
    },
  });
};
