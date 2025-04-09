export interface RatingDto {
  ratingId: number;
  customerId: number;
  createAt: Date;
  stars: number;
  serviceId: number;
  customerName: string;
  serviceName: string;
  feedback: string;
}
