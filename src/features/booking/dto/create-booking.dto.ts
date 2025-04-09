export interface CreateBookingDto {
  customerId: number;
  location: string;
  status: string;
  amount: number;
  skintherapistId: number;
  slotId: number;
  serviceId: number;
}
