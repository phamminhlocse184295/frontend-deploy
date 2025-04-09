import { create } from "zustand";
import { BookingDto } from "../dto/booking.dto";

interface BookingStore {
  bookings: BookingDto[];
  setBookings: (bookings: BookingDto[]) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  setBookings: (bookings) => set({ bookings }),
}));
