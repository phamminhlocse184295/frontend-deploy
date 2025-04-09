import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ScheduleDto } from "../dto/schedule.dto";

const fetchScheduleByService = async (
  serviceId: number
): Promise<ScheduleDto[]> => {
  if (!serviceId) throw new Error("Service ID is required to fetch schedules!");

  const response = await axios.get<ScheduleDto[]>(
    `https://skincareservicebooking.onrender.com/search-by-service/${serviceId}`
  );
  return response.data;
};

export const useGetScheduleByServiceId = (serviceId: number) => {
  return useQuery<ScheduleDto[], Error>({
    queryKey: ["getSchedule", serviceId],
    queryFn: () => fetchScheduleByService(serviceId),
    enabled: !!serviceId,
  });
};
