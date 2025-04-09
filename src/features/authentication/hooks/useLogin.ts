import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { App } from "antd";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "./useAuthStore";

interface DecodedToken {
  accountId: number;
  role: string;
  username: string;
  exp: number;
}

interface LoginResponse {
  accessToken: string;
  user: {
    accountId: number;
    username: string;
    role: string;
  };
}

interface LoginVariables {
  accountName: string;
  password: string;
}

const login = async (credentials: LoginVariables) => {
  const response = await axios.post<LoginResponse>(
    "https://skincareservicebooking.onrender.com/api/auth/login",
    credentials,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

const useLogin = (
  options?: UseMutationOptions<LoginResponse, AxiosError, LoginVariables>
) => {
  const { message } = App.useApp();
  const { setUser, setToken } = useAuthStore();

  return useMutation<LoginResponse, AxiosError, LoginVariables>({
    mutationFn: login,
    onSuccess: (data, variables, context) => {
      const { accessToken } = data;

      const decoded = jwtDecode<DecodedToken>(accessToken);
      const { accountId, role, username } = decoded;

      setUser({ accountId, username, role });
      setToken(accessToken);

      message.success("Đăng nhập thành công");
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error: AxiosError | unknown, variables, context) => {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.message || error.message || "Lỗi máy chủ";
        message.error(errorMsg);
      } else {
        message.error("Lỗi máy chủ");
      }
      options?.onError?.(error as AxiosError, variables, context);
    },
    ...options,
  });
};

export default useLogin;
