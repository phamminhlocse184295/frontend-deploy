import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateBookingDto } from "../dto/create-booking.dto";

interface BookingResponse {
  message: string;
}

export const useCreateBooking = () => {
  const mutation = useMutation<BookingResponse, Error, CreateBookingDto>({
    mutationFn: async (createBooking: CreateBookingDto) => {
      if (!createBooking.slotId) {
        throw new Error("Slot ID is required!");
      }

      const response = await axios.post<BookingResponse>(
        `https://skincareservicebooking.onrender.com/api/Booking/create-booking?slotId=${createBooking.slotId}`,
        createBooking,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    },
  });
  return mutation;
};
