import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ScheduleDto } from "../dto/schedule.dto";

const fetchSchedule = async (): Promise<ScheduleDto[]> => {
  const response = await axios.get<ScheduleDto[]>(
    "https://skincareservicebooking.onrender.com/api/Schedule/getAll"
  );
  return response.data;
};

export const useSchedule = () => {
  return useQuery<ScheduleDto[], Error>({
    queryKey: ["getAll"],
    queryFn: fetchSchedule,
  });
};
