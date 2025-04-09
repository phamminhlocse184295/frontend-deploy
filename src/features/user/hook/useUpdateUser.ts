import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UpdateUserDto } from "../dto/update-user.dto";

const API_BASE_URL =
  "https://6670d16d0900b5f8724babe3.mockapi.io/api/v1/studentManagement";

// Định nghĩa kiểu dữ liệu cho biến mutation
interface MutationVariables {
  id: string;
  data: UpdateUserDto;
}

// Hook cập nhật thông tin người dùng
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({ id, data }: MutationVariables): Promise<void> => {
      await axios.put(`${API_BASE_URL}/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentManagement"] });
    },
  });
};
