import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BlogDto } from "../dto/blog.dto";

const fetchBlogs = async (): Promise<BlogDto[]> => {
  const response = await axios.get<BlogDto[]>(
    "https://skincareservicebooking.onrender.com/getAllBlogs"
  );
  return response.data;
};

export const useBlogs = () => {
  return useQuery<BlogDto[], Error>({
    queryKey: ["getAllBlogs"],
    queryFn: fetchBlogs,
  });
};
