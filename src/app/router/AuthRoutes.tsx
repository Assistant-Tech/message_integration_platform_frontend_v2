import { Routes, Route } from "react-router-dom";
import CheckEmail from "@/app/features/auth/pages/CheckEmail";
import LoginOTP from "@/app/features/auth/pages/LoginOTP";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="check-email" element={<CheckEmail />} />
      <Route path="login-otp" element={<LoginOTP />} />
    </Routes>
  );
};

export default AuthRoutes;
