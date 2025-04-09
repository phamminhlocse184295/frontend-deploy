import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TherapistDto } from "../dto/get-therapist.dto";

interface MutationVariables {
  skintherapistId: string;
  data: TherapistDto;
}

export const useUpdateTherapist = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      skintherapistId,
      data,
    }: MutationVariables): Promise<void> => {
      await axios.put(
        `https://skincareservicebooking.onrender.com/api/skintherapist/updateSkintherapist/${skintherapistId}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateSkintherapist"] });
    },
  });
};
