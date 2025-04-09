import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGetCustomerId } from "./useGetCustomerId"; // Import hook lấy customerId

export interface CustomerDto {
  customerId: number;
  name: string;
  skintypeId: number;
  accountId: number;
  phoneNumber: string;
  image: string;
  email: string;
}

const fetchCustomerById = async (
  customerId: number
): Promise<CustomerDto | null> => {
  if (!customerId || customerId <= 0) return null; // Kiểm tra ID hợp lệ

  try {
    const response = await axios.get<CustomerDto>(
      `https://skincareservicebooking.onrender.com/getCustomerById/${customerId}`
    );

    console.log("✅ API trả về dữ liệu khách hàng:", response.data);
    return response.data ?? null; // Trả về `null` nếu API không có data
  } catch (error) {
    console.error("❌ Lỗi khi lấy thông tin khách hàng:", error);
    return null;
  }
};

export const useGetCustomerById = () => {
  const { customerId } = useGetCustomerId(); // Lấy customerId từ tài khoản đăng nhập

  console.log("🧐 Customer ID từ useGetCustomerId:", customerId);

  const isValidCustomerId = typeof customerId === "number" && customerId > 0;

  return useQuery<CustomerDto | null, Error>({
    queryKey: ["getCustomerById", customerId],
    queryFn: () =>
      isValidCustomerId
        ? fetchCustomerById(customerId!)
        : Promise.resolve(null), // Dùng `customerId!` vì đã check hợp lệ
    enabled: isValidCustomerId, // Chỉ gọi API nếu ID hợp lệ
    staleTime: 1000 * 60 * 5, // Giữ dữ liệu trong 5 phút
    placeholderData: (prevData) => prevData ?? null, // Giữ dữ liệu trước đó
  });
};
