import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BlogDto } from "../dto/blog.dto";

interface MutationVariables {
  blogId: string;
  data: BlogDto;
}

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({ blogId, data }: MutationVariables): Promise<void> => {
      await axios.put(
        `https://skincareservicebooking.onrender.com/updateBlog/${blogId}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["update"] });
    },
  });
};
