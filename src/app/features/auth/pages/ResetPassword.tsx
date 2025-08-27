import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { APP_ROUTES } from "@/app/constants/routes";
import { Button, Input, Logo } from "@/app/components/ui";
import { resetPassword as resetPasswordApi } from "@/app/services/auth.services";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("resetToken");
  const userId = searchParams.get("userId");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    let isValid = true;
    setPasswordError("");
    setConfirmPasswordError("");

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      setLoading(true);

      console.log("userId:", userId);
      console.log("token:", token);
      console.log("searchParams:", searchParams);
      if (!userId || !token) {
        throw new Error("Missing userId or token");
      }
      await resetPasswordApi(userId, token, password, confirmPassword);
      toast.success("Your password has been reset successfully!");
      navigate(APP_ROUTES.PUBLIC.LOGIN);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to reset password.");
      } else {
        toast.error("Failed to reset password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Section */}
      <div className="hidden md:block w-1/2 h-full relative overflow-hidden">
        {/* Gradient Background */}
        <motion.div
          className="absolute inset-0"
          variants={gradientVariants}
          initial="hidden"
          animate="visible"
          style={{
            background:
              "linear-gradient(-45deg, #006b38, #009951, #1cb496, #dbf7ea)",
            backgroundSize: "400% 400%",
          }}
        ></motion.div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute opacity-10 text-white"
            style={{ top: "10%", left: "15%" }}
            variants={floatVariants}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute opacity-10 text-white"
            style={{ top: "25%", right: "20%" }}
            variants={floatVariants}
            transition={{ ...floatVariants.visible.transition, delay: 1 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <circle cx="12" cy="16" r="1" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute opacity-10 text-white"
            style={{ top: "45%", left: "10%" }}
            variants={floatVariants}
            transition={{ ...floatVariants.visible.transition, delay: 2 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 2L19 4L7.5 15.5L4.5 12.5L2 15L7.5 20.5L21 2Z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute opacity-10 text-white"
            style={{ top: "60%", right: "15%" }}
            variants={floatVariants}
            transition={{ ...floatVariants.visible.transition, delay: 1.5 }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 11.08V12A10 10 0 1 1 5.93 7.25" />
              <polyline points="22,4 12,14.01 9,11.01" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute opacity-10 text-white"
            style={{ top: "80%", left: "25%" }}
            variants={floatVariants}
            transition={{ ...floatVariants.visible.transition, delay: 0.5 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute opacity-10 text-white"
            style={{ top: "35%", left: "75%" }}
            variants={floatVariants}
            transition={{ ...floatVariants.visible.transition, delay: 2.5 }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <circle cx="12" cy="16" r="1" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-center items-center p-12 text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Central Shield Icon */}
          <motion.div className="relative mb-8" variants={FadeInAndUp}>
            <motion.div
              className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center relative overflow-hidden"
              variants={floatVariants}
              initial="hidden"
              animate="visible"
              transition={{ ...floatVariants.visible.transition, duration: 3 }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                }}
                variants={shimmerVariants}
                initial="hidden"
                animate="visible"
              ></motion.div>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute -inset-4 rounded-full bg-white/10"
              variants={pingVariants}
              initial="hidden"
              animate="visible"
            ></motion.div>
          </motion.div>

          {/* Main Heading */}
          <div className="text-center space-y-6 max-w-md">
            <motion.h1
              className="text-4xl font-bold leading-tight"
              variants={FadeInAndUp}
            >
              Secure Password Reset
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 leading-relaxed"
              variants={FadeInAndUp}
            >
              Your security is our priority. Create a strong new password to
              protect your account.
            </motion.p>
          </div>

          {/* Security Features */}
          <motion.div
            className="mt-12 space-y-4 w-full max-w-sm"
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center space-x-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm"
              variants={floatVariants}
              initial="hidden"
              animate="visible"
              transition={{ ...floatVariants.visible.transition, duration: 3 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white flex-shrink-0"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-white/90 font-medium">
                256-bit Encryption
              </span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm"
              variants={floatVariants}
              initial="hidden"
              animate="visible"
              transition={{
                ...floatVariants.visible.transition,
                duration: 3,
                delay: 0.5,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white flex-shrink-0"
              >
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" />
              </svg>
              <span className="text-white/90 font-medium">
                Advanced Security
              </span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm"
              variants={floatVariants}
              initial="hidden"
              animate="visible"
              transition={{
                ...floatVariants.visible.transition,
                duration: 3,
                delay: 1,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white flex-shrink-0"
              >
                <path d="M22 11.08V12A10 10 0 1 1 5.93 7.25" />
                <polyline points="22,4 12,14.01 9,11.01" />
              </svg>
              <span className="text-white/90 font-medium">
                Verified Process
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full"
            variants={pingVariants}
            initial="hidden"
            animate="visible"
          ></motion.div>
          <motion.div
            className="absolute top-1/3 right-32 w-1 h-1 bg-white/40 rounded-full"
            variants={pingVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...pingVariants.visible.transition, delay: 1 }}
          ></motion.div>
          <motion.div
            className="absolute bottom-40 left-16 w-3 h-3 bg-white/20 rounded-full"
            variants={pingVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...pingVariants.visible.transition, delay: 2 }}
          ></motion.div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 h-full flex flex-col px-4">
        {/* Go Back Link */}
        <div className="pt-6">
          <Link to={APP_ROUTES.PUBLIC.LOGIN}>
            <span className="flex items-center text-grey gap-2 hover:text-black transition">
              <ArrowLeft size={20} /> Go Back
            </span>
          </Link>
        </div>

        {/* Centered Form */}
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="w-full max-w-md">
            <Logo />
            <div className="text-start pt-8">
              <h1 className="mt-2 h3-bold-32 text-base-black">
                Reset Password
              </h1>
              <p className="h5-medium-16 text-grey-medium pt-2">
                Enter and confirm your new password to reset your account.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <div className="relative">
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError}
                  variant="password"
                  type={showPassword ? "text" : "password"}
                />
                <span
                  className="absolute right-4 top-10 cursor-pointer text-grey-medium"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  placeholder="Enter your password again"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={confirmPasswordError}
                  variant="password"
                  type={showConfirmPassword ? "text" : "password"}
                />
                <span
                  className="absolute right-4 top-10 cursor-pointer text-grey-medium"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>
              </div>

              <Button
                label={loading ? "Submitting..." : "Submit"}
                variant="primary"
                className="mt-8 w-full"
                onClick={handleResetPassword}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pb-6 text-center">
          <p className="h5-bold-16 text-grey-medium">
            © 2025 Chatblix. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
