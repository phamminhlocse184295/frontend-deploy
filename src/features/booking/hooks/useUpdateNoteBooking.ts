import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface MutationVariables {
  bookingId: number;
  note: string;
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, note }: MutationVariables) => {
      await axios.put(
        `https://skincareservicebooking.onrender.com/api/Booking/note/${bookingId}?note=${note}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
  });
};
