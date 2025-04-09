import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TherapistDto } from "../dto/get-therapist.dto";

export const useCreateTherapist = () => {
  return useMutation({
    mutationFn: async (newTherapist: TherapistDto) => {
      const response = await axios.post(
        `https://skincareservicebooking.onrender.com/api/skintherapist/addSkinTherapist`,
        newTherapist
      );
      return response.data;
    },
  });
};
