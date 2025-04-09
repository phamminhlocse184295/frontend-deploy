import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTotalBookingsInMonth = async (): Promise<number> => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const response = await axios.get<number>(
    `https://skincareservicebooking.onrender.com/getTotalBookingsInMonth/${year}/${month}`
  );
  return response.data;
};

export const useTotalBookingsInMonth = () => {
  return useQuery<number, Error>({
    queryKey: ["getTotalBookingsInMonth"],
    queryFn: fetchTotalBookingsInMonth,
    refetchInterval: 10000,
  });
};
