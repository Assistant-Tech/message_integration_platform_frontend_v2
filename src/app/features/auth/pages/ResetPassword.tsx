import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { APP_ROUTES } from "@/app/constants/routes";
import { Button, Input, Logo } from "@/app/components/ui";
import { resetPassword as resetPasswordApi } from "@/app/services/auth.services";

const ResetPassword = () => {
  const { userId, token } = useParams<{ userId: string; token: string }>();
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
      <div className="hidden md:flex w-1/2 h-full relative overflow-hidden bg-gradient-to-br from-primary-light via-primary-inactiv to-primary  text-white">
        {/* Floating Icons */}
        <motion.div
          className="absolute top-[15%] left-[10%] opacity-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowLeft size={48} />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] right-[15%] opacity-20"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Eye size={48} />
        </motion.div>

        <motion.div
          className="absolute top-[40%] right-[40%] opacity-20"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <EyeOff size={48} />
        </motion.div>

        {/* Central Lock Illustration */}
        <div className="flex flex-col justify-center items-center w-full h-full relative z-10">
          <img
            src="https://res.cloudinary.com/dtoqwn0gx/image/upload/v1757309450/reset-passwod-removebg-preview_b6upx5.png"
            alt="Reset Password Illustration"
            className="w-72 h-72 object-contain"
          />
          <h2 className="mt-6 text-3xl font-bold">Secure Reset</h2>
          <p className="text-white/80 mt-2 text-center max-w-xs">
            Protecting your account with strong, safe password recovery.
          </p>
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
