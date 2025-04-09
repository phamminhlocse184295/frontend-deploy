import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MonthlyBookingRevenue } from "../dto/dashboard.dto";

const fetchMonthlyBookingRevenue = async (): Promise<
  MonthlyBookingRevenue[]
> => {
  const year = new Date().getFullYear();

  const response = await axios.get<MonthlyBookingRevenue[]>(
    `https://skincareservicebooking.onrender.com/getMonthlyBookingRevenue/${year}`
  );
  return response.data;
};

export const useMonthlyBookingRevenue = () => {
  return useQuery<MonthlyBookingRevenue[], Error>({
    queryKey: ["getMonthlyBookingRevenue"],
    queryFn: fetchMonthlyBookingRevenue,
    refetchInterval: 10000,
  });
};
