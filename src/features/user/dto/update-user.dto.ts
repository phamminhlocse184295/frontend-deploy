export interface UpdateUserDto {
  id: string;
  name?: string;
  dateofbirth?: Date;
  gender?: boolean;
  class?: string;
  image?: string;
  feedback?: string;
}
