import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CustomerProfileDto } from "../dto/customer-profile.dto";

const fetchCustomerProfile = async (
  accountId: number,
  role: string
): Promise<CustomerProfileDto | null> => {
  const response = await axios.get(
    `https://skincareservicebooking.onrender.com/getAccountByIdAndRole/${accountId}/${role}`
  );

  if (!response.data || response.data.length === 0) {
    return null;
  }

  const account = response.data[0];

  if (!account?.customer?.length) {
    return null;
  }

  const customer = account.customer[0];

  return {
    accountName: account.accountName || "",
    name: customer.name || "",
    phoneNumber: customer.phoneNumber || "",
    image: customer.image || "",
    email: customer.email || "",
  };
};

// Hook sử dụng React Query để fetch dữ liệu
export const useGetCustomerProfile = (accountId: number, role: string) => {
  return useQuery<CustomerProfileDto | null, Error>({
    queryKey: ["getCustomerProfile", accountId, role],
    queryFn: () => fetchCustomerProfile(accountId, role),
    enabled: !!accountId && !!role, // Chỉ gọi API nếu có accountId và role
  });
};
