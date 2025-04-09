import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SkinDto } from "../dto/skin.dto";

export const useCreateSkin = () => {
  return useMutation({
    mutationFn: async (newSkin: SkinDto) => {
      const response = await axios.post(
        `https://skincareservicebooking.onrender.com/api/skintype/createSkintype`,
        newSkin
      );
      return response.data;
    },
  });
};
