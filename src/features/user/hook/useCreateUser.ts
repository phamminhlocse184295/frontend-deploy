import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UserDto } from "../dto/get-user.dto";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (newUser: UserDto) => {
      const response = await axios.post(
        `https://skincareservicebooking.onrender.com/createAccount`,
        newUser
      );
      return response.data;
    },
  });
};
