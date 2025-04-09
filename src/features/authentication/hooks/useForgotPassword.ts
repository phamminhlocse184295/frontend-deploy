import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface ForgorPasswordDto {
  email: string;
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (verifyAccount: ForgorPasswordDto) => {
      const response = await axios.post(
        `https://skincareservicebooking.onrender.com/api/auth/forgotPassword`,
        verifyAccount
      );
      return response.data;
    },
  });
};
