import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SlotDto } from "../dto/slot.dto";

// API call to get booked slots
const fetchBookedSlots = async (): Promise<SlotDto[]> => {
  const response = await axios.get<SlotDto[]>(
    "https://skincareservicebooking.onrender.com/api/slot/getBookedSlots"
  );
  return response.data;
};

// FIXED: Correct queryKey and function
export const useBookedSlot = () => {
  return useQuery<SlotDto[], Error>({
    queryKey: ["getBookedSlots"],
    queryFn: fetchBookedSlots,
  });
};
