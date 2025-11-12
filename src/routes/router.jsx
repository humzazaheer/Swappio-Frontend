import { createBrowserRouter } from "react-router";
import { RoutePath } from "./routes";
import { AuthPage } from "@pages/AuthPage";
import Login from "@features/auth/Login";
import Register from "@features/auth/Register";
import VerifyAccount from "@features/auth/VerifyAccount";
import ForgotPassword from "@features/auth/ForgotPassword";
import ResetPassword from "@features/auth/ResetPassword";
import VerifyOTP from "@features/auth/VerifyOTP";
import Base from "@layout/base";
import Home from "@pages/Home";
import Categories from "@pages/Categories";
import Ads from "@pages/Ads";
import ProtectedRoute from "@routes/ProtectedRoute";
import Profile from "@features/user/Profile";
import UserPage from "@pages/UserPage";
import Logout from "@features/auth/Logout";



export const router = createBrowserRouter(
    [
        {
            path: '/',
            Component: Base,
            children: [
                {
                    index: true,
                    Component: Home
                },
                {
                    path: RoutePath.CATEGORIES,
                    element: <ProtectedRoute><Categories /></ProtectedRoute>
                },
                {
                    path: RoutePath.ADS,
                    Component: Ads
                },
                {
                    element: <ProtectedRoute requireAuth={true} />,
                    children: [
                        {
                            path: RoutePath.USER,
                            Component: UserPage,
                            children: [
                                {
                                    index: true,
                                    path: RoutePath.PROFILE,
                                    Component: Profile
                                },
                                {
                                    path: RoutePath.LOGOUT,
                                    Component: Logout
                                }
                            ]
                        }
                    ]
                },
                {
                    element: <ProtectedRoute requireAuth={false} />,
                    children: [
                        {
                            path: RoutePath.AUTH,
                            Component: AuthPage,
                            children: [
                                {
                                    index: true,
                                    Component: Login
                                },
                                {
                                    path: RoutePath.LOGIN,
                                    Component: Login
                                },
                                {
                                    path: RoutePath.REGISTER,
                                    Component: Register
                                },
                                {
                                    path: RoutePath.VERIFY_ACCOUNT,
                                    Component: VerifyAccount
                                },
                                {
                                    path: RoutePath.FORGOT_PASSWORD,
                                    Component: ForgotPassword
                                },
                                {
                                    path: RoutePath.VERIFY_OTP,
                                    Component: VerifyOTP
                                },
                                {
                                    path: RoutePath.RESET_PASSWORD,
                                    Component: ResetPassword
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
);