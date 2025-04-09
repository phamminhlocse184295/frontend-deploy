// import { PagePath } from "../enums/page-path.enum";
// import useAuthStore from "../features/authentication/hooks/useAuthStore";
// import { createContext, useEffect, type PropsWithChildren } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { message } from "antd";
// import { jwtDecode } from "jwt-decode";

// type UserRole = "Customer" | "Manager" | "Staff" | "Skintherapist" | "Admin";

// type AuthGuardContextType = Record<string, unknown>;

// type AuthGuardProviderProps = PropsWithChildren;

// const AuthGuardContext = createContext<AuthGuardContextType>({});

// export function AuthGuardProvider(props: AuthGuardProviderProps) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { children } = props;
//   const { user, logout, token } = useAuthStore();

//   useEffect(() => {
//     if (token) {
//       try {
//         const decoded = jwtDecode<{ exp: number }>(token);
//         const currentTime = Math.floor(Date.now() / 1000);

//         if (decoded.exp < currentTime) {
//           message.warning("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
//           logout();
//           return;
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         logout();
//       }
//     }
//   }, [token, logout]);

//   useEffect(() => {
//     const publicPages: PagePath[] = [
//       PagePath.LOGIN,
//       PagePath.RESET_PASSWORD,
//       PagePath.VERIFY_EMAIL,
//       PagePath.VERIFY_OTP,
//       PagePath.HOME_PAGE,
//       PagePath.ROOT,
//       PagePath.BLOG,
//       PagePath.SKIN_THERAPIST,
//       PagePath.PRICE_SERVICE,
//       PagePath.SKIN_SERVICE,
//       PagePath.SKIN_TYPE,
//     ];

//     if (!user || !user.role) {
//       if (!publicPages.includes(location.pathname as PagePath)) {
//         navigate(PagePath.LOGIN, { replace: true });
//         // message.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
//       }
//       return;
//     }

//     const role = user.role as UserRole;
//     const restrictedPages: Record<UserRole, string[]> = {
//       Admin: [
//         PagePath.USER_MANAGEMENT,
//         PagePath.USER_DETAIL,
//         PagePath.HOME,
//         PagePath.WORK_VOLUME,
//         PagePath.PROFILE,
//         PagePath.SKIN_TYPE_MANAGEMENT,
//         PagePath.SLOT_MANAGEMENT,
//         PagePath.SERVICE_MANAGEMENT,
//       ],
//       Staff: [
//         PagePath.HOME,
//         PagePath.BOOKING,
//         PagePath.SLOT_MANAGEMENT,
//         // PagePath.BOOKING_DETAIL.replace(":bookingId", ""),
//         PagePath.BOOKING_DETAIL,
//         PagePath.SCHEDULE_FOR_STAFF_MANAGEMENT,
//       ],
//       Skintherapist: [
//         PagePath.HOME,
//         PagePath.BOOKING,
//         PagePath.BOOKING_DETAIL,
//         PagePath.PROFILE,
//         PagePath.SCHEDULE_FOR_THERAPIST,
//       ],
//       Customer: [
//         PagePath.CUSTOMER_PROFILE,
//         PagePath.BLOG,
//         PagePath.BLOG_DETAIL,
//         PagePath.BOOKING_SERVICE,
//         PagePath.SKIN_SERVICE,
//         // PagePath.SKIN_SERVICE_DETAIL.replace(":serviceId", ""),
//         PagePath.SKIN_SERVICE_DETAIL,
//         PagePath.SKIN_THERAPIST,
//         PagePath.SKIN_THERAPIST_DETAIL,
//         PagePath.PRICE_SERVICE,
//         PagePath.QUIZ,
//         PagePath.SKIN_TYPE,
//         PagePath.BOOKING_INFO_CONFIRM,
//         PagePath.COMPLETE_RESULT,
//         PagePath.CUSTOMER_BOOKING_DETAIL,
//       ],
//       Manager: [],
//     };

//     const currentPage = location.pathname as PagePath;

//     if (!publicPages.includes(currentPage) && restrictedPages[role]?.length) {
//       const allowedPages = restrictedPages[role] || [];

//       if (!allowedPages.includes(currentPage)) {
//         navigate(PagePath.FORBIDDEN, { replace: true });
//         // message.error("Bạn không có quyền truy cập trang này");
//       }
//     }
//     // const currentPage = location.pathname;

//     // const isAllowed = restrictedPages[role]?.some((allowedPath) =>
//     //   currentPage.startsWith(allowedPath)
//     // );

//     // if (!publicPages.includes(currentPage as PagePath) && !isAllowed) {
//     //   navigate(PagePath.FORBIDDEN, { replace: true });
//     // }
//   }, [user, location, navigate]);

//   return (
//     <AuthGuardContext.Provider value={{}}>{children}</AuthGuardContext.Provider>
//   );
// }

// export default AuthGuardContext;
import { PagePath } from "../enums/page-path.enum";
import useAuthStore from "../features/authentication/hooks/useAuthStore";
import { createContext, useEffect, type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";

type UserRole = "Customer" | "Manager" | "Staff" | "Skintherapist" | "Admin";

type AuthGuardContextType = Record<string, unknown>;

type AuthGuardProviderProps = PropsWithChildren;

const AuthGuardContext = createContext<AuthGuardContextType>({});

export function AuthGuardProvider(props: AuthGuardProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { children } = props;
  const { user, logout, token, setUser, setToken } = useAuthStore();

  useEffect(() => {
    if (!user || !token) {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    }

    if (token) {
      try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
          message.warning("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
          logout();
          return;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();
      }
    }
  }, [token, user, setUser, setToken, logout]);

  useEffect(() => {
    const publicPages: PagePath[] = [
      PagePath.LOGIN,
      PagePath.RESET_PASSWORD,
      PagePath.VERIFY_EMAIL,
      PagePath.VERIFY_OTP,
      PagePath.HOME_PAGE,
      PagePath.ROOT,
      PagePath.BLOG,
      PagePath.SKIN_THERAPIST,
      PagePath.PRICE_SERVICE,
      PagePath.SKIN_SERVICE,
      PagePath.SKIN_TYPE,
    ];

    if (!user || !user.role) {
      if (!publicPages.includes(location.pathname as PagePath)) {
        navigate(PagePath.LOGIN, { replace: true });
      }
      return;
    }

    const roleRedirects: Record<UserRole, PagePath> = {
      Admin: PagePath.HOME,
      Staff: PagePath.HOME,
      Skintherapist: PagePath.HOME,
      Customer: PagePath.HOME_PAGE,
      Manager: PagePath.HOME,
    };

    if (location.pathname === PagePath.ROOT) {
      navigate(roleRedirects[user.role as UserRole], { replace: true });
      return;
    }

    const restrictedPages: Record<UserRole, PagePath[]> = {
      Admin: [
        PagePath.HOME,
        PagePath.USER_MANAGEMENT,
        PagePath.USER_DETAIL,
        PagePath.WORK_VOLUME,
        PagePath.PROFILE,
        PagePath.SKIN_TYPE_MANAGEMENT,
        PagePath.SLOT_MANAGEMENT,
        PagePath.BLOG_MANAGEMENT,
        PagePath.SERVICE_MANAGEMENT,
        PagePath.QUIZ_MANAGEMENT,
      ],
      Staff: [
        PagePath.HOME,
        PagePath.BOOKING,
        PagePath.SLOT_MANAGEMENT,
        PagePath.BOOKING_DETAIL,
        PagePath.SCHEDULE_FOR_STAFF_MANAGEMENT,
        PagePath.THERAPIST_MANAGEMENT,
      ],
      Skintherapist: [
        PagePath.HOME,
        PagePath.BOOKING,
        PagePath.BOOKING_DETAIL,
        PagePath.PROFILE,
        PagePath.SCHEDULE_FOR_THERAPIST,
      ],
      Customer: [
        PagePath.CUSTOMER_PROFILE,
        PagePath.BLOG,
        PagePath.BLOG_DETAIL,
        PagePath.BOOKING_SERVICE,
        PagePath.SKIN_SERVICE,
        PagePath.SKIN_SERVICE_DETAIL,
        PagePath.SKIN_THERAPIST,
        PagePath.SKIN_THERAPIST_DETAIL,
        PagePath.PRICE_SERVICE,
        PagePath.QUIZ,
        PagePath.SKIN_TYPE,
        PagePath.BOOKING_INFO_CONFIRM,
        PagePath.COMPLETE_RESULT,
        PagePath.CUSTOMER_BOOKING_DETAIL,
        PagePath.CREATE_BLOG,
      ],
      Manager: [],
    };

    const currentPage = location.pathname as PagePath;

    if (
      !publicPages.includes(currentPage) &&
      restrictedPages[user.role as UserRole]?.length
    ) {
      const allowedPages = restrictedPages[user.role as UserRole] || [];

      if (!allowedPages.includes(currentPage)) {
        navigate(PagePath.FORBIDDEN, { replace: true });
      }
    }
  }, [user, location, navigate]);

  return (
    <AuthGuardContext.Provider value={{}}>{children}</AuthGuardContext.Provider>
  );
}

export default AuthGuardContext;
