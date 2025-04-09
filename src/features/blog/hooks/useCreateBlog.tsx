import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BlogDto } from "../dto/blog.dto";

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: async (newBlog: BlogDto) => {
      const response = await axios.post(
        `https://skincareservicebooking.onrender.com/createBlog`,
        newBlog
      );
      return response.data;
    },
  });
};
