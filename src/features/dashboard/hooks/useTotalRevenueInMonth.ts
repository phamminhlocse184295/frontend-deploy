import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTotalRevenueInMonth = async (): Promise<number> => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const response = await axios.get<number>(
    `https://skincareservicebooking.onrender.com/getTotalRevenueInMonth/${year}/${month}`
  );
  return response.data;
};

export const useTotalRevenueInMonth = () => {
  return useQuery<number, Error>({
    queryKey: ["getTotalRevenueInMonth"],
    queryFn: fetchTotalRevenueInMonth,
    refetchInterval: 10000,
  });
};
