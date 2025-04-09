import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SlotDto } from "../dto/slot.dto";

const fetchSlots = async (): Promise<SlotDto[]> => {
  const response = await axios.get<SlotDto[]>(
    "https://skincareservicebooking.onrender.com/api/slot/getAllSlots"
  );
  return response.data;
};

export const useSlots = () => {
  return useQuery<SlotDto[], Error>({
    queryKey: ["getAllSlots"],
    queryFn: fetchSlots,
  });
};
