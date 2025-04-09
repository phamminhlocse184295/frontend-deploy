import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CustomerProfileDto } from "../dto/profile.dto";

export const useGetCustomerProfile = (accountId?: number, role?: string) => {
  return useQuery({
    queryKey: ["getAccountByIdAndRole", accountId, role],
    queryFn: async () => {
      if (!accountId || !role) throw new Error("Thiếu thông tin đăng nhập");
      const response = await axios.get<CustomerProfileDto[]>(
        `https://skincareservicebooking.onrender.com/getAccountByIdAndRole/${accountId}/${role}`
      );
      return response.data;
    },
    enabled: !!accountId && !!role, // Chỉ gọi API khi có accountId và role
  });
};
