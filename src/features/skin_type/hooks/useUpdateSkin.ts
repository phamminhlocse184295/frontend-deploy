import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SkinDto } from "../dto/skin.dto";

interface MutationVariables {
  skintypeId: string;
  data: SkinDto;
}

export const useUpdateSkin = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationVariables>({
    mutationFn: async ({
      skintypeId,
      data,
    }: MutationVariables): Promise<void> => {
      await axios.put(
        `https://skincareservicebooking.onrender.com/api/skintype/updateSkintype/${skintypeId}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateSkintype"] });
    },
  });
};
