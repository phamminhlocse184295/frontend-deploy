export interface LoginDto {
  accountName: string;
  password: string;
}

export interface LoginResponseDto {
  message: string;
  accountId: number;
  role: string;
  token: string;
}
