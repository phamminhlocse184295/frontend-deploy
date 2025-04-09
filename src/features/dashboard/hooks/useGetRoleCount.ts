import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoleCountDto } from "../dto/dashboard.dto";

const fetchRoleCounts = async (): Promise<RoleCountDto[]> => {
  const response = await axios.get<RoleCountDto[]>(
    "https://skincareservicebooking.onrender.com/getRoleCounts"
  );
  return response.data;
};

export const useRoleCounts = () => {
  return useQuery<RoleCountDto[], Error>({
    queryKey: ["getRoleCounts"],
    queryFn: fetchRoleCounts,
    refetchInterval: 10000,
  });
};
