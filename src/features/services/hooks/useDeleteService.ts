import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string): Promise<void> => {
      await axios.delete(
        `https://skincareservicebooking.onrender.com/api/service/deleteService/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteService"] });
    },
  });
};
