import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SkintherapistProfileDto } from "../dto/profile.dto";

export const useGetTherapistProfile = (accountId?: number, role?: string) => {
  return useQuery({
    queryKey: ["getAccountByIdAndRole", accountId, role],
    queryFn: async () => {
      if (!accountId || !role) throw new Error("Thiếu thông tin đăng nhập");
      const response = await axios.get<SkintherapistProfileDto[]>(
        `https://skincareservicebooking.onrender.com/getAccountByIdAndRole/${accountId}/${role}`
      );
      return response.data;
    },
    enabled: !!accountId && !!role,
  });
};
