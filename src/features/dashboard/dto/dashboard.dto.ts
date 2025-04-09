export interface DashboardDto {
  totalBookings: number;
  totalCustomers: number;
  totalRevenue: number;
  totalSkintherapists: number;
}

export interface RoleCountDto {
  role: string;
  count: number;
}

export interface MonthlyBookingRevenue {
  month: number;
  totalBookings: number;
  totalRevenue: number;
}
