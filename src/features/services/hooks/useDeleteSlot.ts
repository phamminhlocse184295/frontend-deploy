import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteSlot = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (slotId: number): Promise<void> => {
      await axios.delete(
        `https://skincareservicebooking.onrender.com/api/slot/deleteSlot/${slotId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteService"] });
    },
  });
};
