import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookingDto } from "../dto/booking.dto";

export const useBookingById = (bookingId: string) => {
  return useQuery<BookingDto, Error>({
    queryKey: ["getBookingById", bookingId],
    queryFn: async () => {
      const response = await axios.get<BookingDto>(
        `https://skincareservicebooking.onrender.com/api/Booking/getBookingById/${bookingId}`
      );
      return response.data;
    },
    enabled: !!bookingId,
  });
};
