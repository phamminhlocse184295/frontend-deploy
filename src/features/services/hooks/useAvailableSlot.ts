import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SlotDto } from "../dto/slot.dto";

const fetchAvailableSlots = async (): Promise<SlotDto[]> => {
  const response = await axios.get<SlotDto[]>(
    "https://skincareservicebooking.onrender.com/api/slot/getAvailableSlots"
  );
  return response.data;
};

export const useAvailableSlot = () => {
  return useQuery<SlotDto[], Error>({
    queryKey: ["getAvailableSlots"],
    queryFn: fetchAvailableSlots,
  });
};
