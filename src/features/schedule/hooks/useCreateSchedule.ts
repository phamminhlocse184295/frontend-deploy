import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ScheduleDto } from "../dto/schedule.dto";

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: async (newSchedule: ScheduleDto) => {
      const response = await axios.post(
        `https://skincareservicebooking.onrender.com/api/Schedule/createSchedule`,
        newSchedule
      );
      return response.data;
    },
  });
};
