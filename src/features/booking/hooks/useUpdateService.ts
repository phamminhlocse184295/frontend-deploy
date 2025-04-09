import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface MutationVariables {
  bookingId: number;
  serviceId: number;
}

export const useUpdateServiceName = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      bookingId,
      serviceId,
    }: MutationVariables): Promise<void> => {
      await axios.put(
        `https://skincareservicebooking.onrender.com/api/Booking/serviceName/${bookingId}?serviceId=${serviceId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceName"] });
    },
  });
};
