export interface SkintherapistProfileDto {
  accountId: number;
  accountName: string;
  password: string | null;
  role: string;
  active: boolean;
  customer: null;
  skinTherapists: {
    skintherapistId: number;
    name: string;
    speciality: string;
    email: string;
    experience: string;
    image: string;
    degree: string;
    accountId: number | null;
  }[];
}

export interface CustomerProfileDto {
  accountId: number;
  accountName: string;
  password: string | null;
  role: string;
  active: boolean;
  customer: {
    customerId: number;
    name: string;
    skintypeId: number;
    accountId: number;
    phoneNumber: string;
    image: string;
    email: string;
  }[];
  skinTherapists: null; // Có thể là object hoặc null
}
