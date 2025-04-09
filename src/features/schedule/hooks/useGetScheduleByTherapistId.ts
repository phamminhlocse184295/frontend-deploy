import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ScheduleDto } from "../dto/schedule.dto";

export const useGetScheduleByTherapistId = (skintherapistId: number) => {
  return useQuery<ScheduleDto, Error>({
    queryKey: ["search-by-skintherapist", skintherapistId],
    queryFn: async () => {
      const response = await axios.get<ScheduleDto>(
        `https://skincareservicebooking.onrender.com/search-by-skintherapist/${skintherapistId}`
      );
      return response.data;
    },
    enabled: !!skintherapistId,
  });
};
