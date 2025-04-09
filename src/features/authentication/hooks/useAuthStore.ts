import { create } from "zustand";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface User {
  accountId: number;
  role: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  login: (values: {
    accountName: string;
    password: string;
  }) => Promise<{ success: boolean; message: string; role: string }>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

const useAuthStore = create<AuthState>((set) => {
  const loadStoredAuth = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null,
      error: null,
    };
  };

  return {
    ...loadStoredAuth(),

    login: async (values) => {
      try {
        const response = await axios.post(
          "https://skincareservicebooking.onrender.com/api/auth/login",
          values,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = response.data;
        if (data.token) {
          const decoded = jwtDecode<{
            nameid: number;
            unique_name: string;
            role: string;
          }>(data.token);

          const user = {
            accountId: decoded.nameid,
            username: decoded.unique_name,
            role: decoded.role,
          };

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", data.token);

          set({ user, token: data.token, error: null });
          return { success: true, message: data.message, role: decoded.role };
        } else {
          set({ error: "Login failed" });
          return { success: false, message: "Login failed", role: "" };
        }
      } catch (error) {
        let errorMessage =
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : (error as Error).message;

        if (errorMessage === "Incorrect account name or password!") {
          errorMessage = "Tài khoản hoặc mật khẩu không đúng";
        }

        set({ error: errorMessage });
        return { success: false, message: errorMessage, role: "" };
      }
    },

    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null, token: null, error: null });
    },

    setUser: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
    },

    setToken: (token) => {
      localStorage.setItem("token", token);
      set({ token });
    },
  };
});

export default useAuthStore;
