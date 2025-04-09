import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SkinDto } from "../dto/skin.dto";

const fetchSkinTypeById = async (id: number): Promise<SkinDto> => {
  const response = await axios.get<SkinDto>(
    `https://skincareservicebooking.onrender.com/api/skintype/getSkintypeById/${id}`
  );
  return response.data;
};

export const useSkinTypeById = (id: number) => {
  return useQuery<SkinDto, Error>({
    queryKey: ["getSkintypeById", id],
    queryFn: () => fetchSkinTypeById(id),
    enabled: !!id,
  });
};
