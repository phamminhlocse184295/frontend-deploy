import { useCustomers } from "./useGetCustomer";
import useAuthStore from "../../authentication/hooks/useAuthStore";

export const useGetCustomerId = () => {
  const { user } = useAuthStore();
  const { data: customers, isLoading, error } = useCustomers();

  if (isLoading) return { customerId: null, isLoading, error };
  if (error) return { customerId: null, isLoading, error };

  const userAccountId = Number(user?.accountId);

  const customer = customers?.find(
    (c) => Number(c.accountId) === userAccountId
  );

  console.log("Matched customer:", customer);

  return { customerId: customer?.customerId ?? null, isLoading, error };
};
