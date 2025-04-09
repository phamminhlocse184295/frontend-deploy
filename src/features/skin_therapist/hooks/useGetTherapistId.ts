import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TherapistDto } from "../dto/get-therapist.dto";

const API_BASE_URL =
  "https://skincareservicebooking.onrender.com/api/skintherapist/getSkintherapistById";

export const useTherapistById = (skintherapistId: string) => {
  return useQuery<TherapistDto, Error>({
    queryKey: ["getSkintherapistById", skintherapistId],
    queryFn: async () => {
      const response = await axios.get<TherapistDto>(
        `${API_BASE_URL}/${skintherapistId}`
      );
      return response.data;
    },
    enabled: !!skintherapistId,
  });
};
