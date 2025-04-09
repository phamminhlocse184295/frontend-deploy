import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteSkin = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (skintypeId: number): Promise<void> => {
      await axios.delete(
        `https://skincareservicebooking.onrender.com/api/skintype/deleteSkintype/${skintypeId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteService"] });
    },
  });
};
