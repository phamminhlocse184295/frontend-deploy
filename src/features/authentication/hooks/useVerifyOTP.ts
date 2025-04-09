import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface VerifyOTPDto {
  email: string;
  otp: string;
}

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async (verifyOTP: VerifyOTPDto) => {
      const response = await axios.post(
        `https://skincareservicebooking.onrender.com/api/auth/verifyOtp`,
        verifyOTP
      );
      return response.data;
    },
  });
};
