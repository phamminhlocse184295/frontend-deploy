import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookingDto } from "../dto/booking.dto";

const fetchBookings = async (bookingStatus: string): Promise<BookingDto[]> => {
  const response = await axios.get<BookingDto[]>(
    `https://skincareservicebooking.onrender.com/api/Booking/booked/${bookingStatus}`
  );
  return response.data;
};

export const useBookings = (bookingStatus: string) => {
  return useQuery<BookingDto[], Error>({
    queryKey: ["getBookings", bookingStatus],
    queryFn: () => fetchBookings(bookingStatus),
  });
};
