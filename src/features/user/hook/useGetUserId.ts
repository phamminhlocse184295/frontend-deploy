import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserDto } from "../dto/get-user.dto";

const API_BASE_URL =
  "https://6670d16d0900b5f8724babe3.mockapi.io/api/v1/studentManagement";

export const useUserById = (id: string) => {
  return useQuery<UserDto, Error>({
    queryKey: ["studentManagement", id],
    queryFn: async () => {
      const response = await axios.get<UserDto>(`${API_BASE_URL}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
