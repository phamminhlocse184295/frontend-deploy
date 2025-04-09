import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BlogDto } from "../dto/blog.dto";

export const useBlogById = (blogId: string) => {
  return useQuery<BlogDto, Error>({
    queryKey: ["getBookingById", blogId],
    queryFn: async () => {
      const response = await axios.get<BlogDto>(
        `https://skincareservicebooking.onrender.com/getBlogById/${blogId}`
      );
      return response.data;
    },
    enabled: !!blogId,
  });
};
