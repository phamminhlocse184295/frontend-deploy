import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./features/authentication/components/Login";
import Register from "./features/authentication/components/Register";
import Home from "./pages/Home";
import WorkVolume from "./features/work_volume/WorkVolume";
import UserListPage from "./features/user/pages/UserListPage";
import UserDetail from "./features/user/components/UserListDetail";
import { PagePath } from "./enums/page-path.enum";
import Profile from "./features/authentication/components/Profile";
import SidebarMenu from "./components/SidebarMenu";
import VerifyEmail from "./features/authentication/components/VerifyEmail";
import VerifyOTP from "./features/authentication/components/VerifyOTP";
import QuizTest from "./features/quiz/components/Quiz";
import SkincareServices from "./features/services/components/SkinService";
import BlogPage from "./features/blog/components/Blog";
import BlogDetail from "./features/blog/components/BlogDetail";
import NavbarMenu from "./components/NavBarMenu";
import ServiceDetail from "./features/services/components/SkinServiceDetail";
import SkincareBooking from "./features/services/components/BookingService";
import PricingTable from "./pages/PricingPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import { AuthGuardProvider } from "./contexts/AuthGuardContext";
import SkinTherapistListPage from "./features/skin_therapist/page/SkinTherapistListPage";
import SkinTherapistDetailPage from "./features/skin_therapist/page/SkinTherapistDetailPage";
import BookingListTable from "./features/booking/components/BookingListTable";
import SkinType from "./features/skin_type/components/SkinTypeList";
import BookingDetail from "./features/booking/components/BookingDetail";
import CompleteBookingPage from "./pages/CompleteResult";
import ScheduleCalendarPage from "./features/schedule/page/SchedulePage";
import ScheduleCalendarManagementPage from "./features/schedule/page/TherapistSchedulePage";
import BookingInfoConfirm from "./features/services/components/BookingInfoConfirm";
import CustomerProfile from "./pages/CustomerProfilePage";
import CustomerBookingDetail from "./pages/CustomerBookingDetail";
import ServiceTable from "./features/services/components/ServiceTable";
import SlotTable from "./features/services/components/SlotTable";
import SkinTypeTable from "./features/skin_type/components/SkinTypeTable";
import ResetPassword from "./features/authentication/components/ResetPassword";
import QuizTable from "./features/quiz/components/QuizTable";
import BlogTable from "./features/blog/components/BlogTable";
import CreateBlog from "./features/blog/components/CreateBlog";
import TherapistTable from "./features/skin_therapist/components/TherapistTable";

const App = () => {
  return (
    <Router>
      <AuthGuardProvider>
        <Routes>
          <Route
            path={PagePath.ROOT}
            element={<Navigate to={PagePath.HOME_PAGE} />}
          />
          <Route path={PagePath.LOGIN} element={<Login />} />
          <Route path={PagePath.REGISTER} element={<Register />} />
          <Route path={PagePath.VERIFY_EMAIL} element={<VerifyEmail />} />
          <Route path={PagePath.VERIFY_OTP} element={<VerifyOTP />} />
          <Route path={PagePath.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={PagePath.ANY} element={<NotFoundPage />} />
          <Route path={PagePath.FORBIDDEN} element={<ForbiddenPage />} />
          <Route element={<SidebarMenu />}>
            <Route path={PagePath.HOME} element={<Home />}></Route>
            <Route path={PagePath.WORK_VOLUME} element={<WorkVolume />} />
            <Route path={PagePath.USER_MANAGEMENT} element={<UserListPage />} />
            <Route path={PagePath.USER_DETAIL} element={<UserDetail />} />
            <Route path={PagePath.PROFILE} element={<Profile />} />
            <Route path={PagePath.BOOKING} element={<BookingListTable />} />
            <Route path={PagePath.BOOKING_DETAIL} element={<BookingDetail />} />
            <Route
              path={PagePath.SCHEDULE_FOR_STAFF_MANAGEMENT}
              element={<ScheduleCalendarPage />}
            />
            <Route
              path={PagePath.SCHEDULE_FOR_THERAPIST}
              element={<ScheduleCalendarManagementPage />}
            />
            <Route path={PagePath.QUIZ_MANAGEMENT} element={<QuizTable />} />
            <Route
              path={PagePath.SERVICE_MANAGEMENT}
              element={<ServiceTable />}
            />
            <Route path={PagePath.BLOG_MANAGEMENT} element={<BlogTable />} />
            <Route path={PagePath.SLOT_MANAGEMENT} element={<SlotTable />} />
            <Route
              path={PagePath.SKIN_TYPE_MANAGEMENT}
              element={<SkinTypeTable />}
            />
            <Route
              path={PagePath.THERAPIST_MANAGEMENT}
              element={<TherapistTable />}
            />
          </Route>
          <Route element={<NavbarMenu />}>
            <Route path={PagePath.HOME_PAGE} element={<HomePage />} />
            <Route path={PagePath.QUIZ} element={<QuizTest />} />
            <Route
              path={PagePath.SKIN_SERVICE}
              element={<SkincareServices />}
            />
            <Route
              path={PagePath.SKIN_SERVICE_DETAIL}
              element={<ServiceDetail />}
            />
            <Route path={PagePath.BLOG} element={<BlogPage />} />
            <Route path={PagePath.BLOG_DETAIL} element={<BlogDetail />} />
            <Route
              path={PagePath.SKIN_THERAPIST}
              element={<SkinTherapistListPage />}
            />
            <Route
              path={PagePath.SKIN_THERAPIST_DETAIL}
              element={<SkinTherapistDetailPage />}
            />
            <Route
              path={PagePath.BOOKING_SERVICE}
              element={<SkincareBooking />}
            />
            <Route path={PagePath.PRICE_SERVICE} element={<PricingTable />} />
            <Route path={PagePath.SKIN_TYPE} element={<SkinType />} />
            <Route
              path={PagePath.BOOKING_INFO_CONFIRM}
              element={<BookingInfoConfirm />}
            />
            <Route
              path={PagePath.COMPLETE_RESULT}
              element={<CompleteBookingPage />}
            />
            <Route
              path={PagePath.CUSTOMER_PROFILE}
              element={<CustomerProfile />}
            />
            <Route
              path={PagePath.CUSTOMER_BOOKING_DETAIL}
              element={<CustomerBookingDetail />}
            />
            <Route path={PagePath.CREATE_BLOG} element={<CreateBlog />} />
          </Route>
        </Routes>
      </AuthGuardProvider>
    </Router>
  );
};

export default App;
