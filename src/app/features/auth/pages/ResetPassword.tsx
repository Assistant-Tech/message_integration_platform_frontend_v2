import { Button, Input, Logo } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";
import { forgetPassword } from "@/app/services/auth.services";

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await forgetPassword(email);
      toast.success(
        res.message || "A password reset link has been sent to your email.",
      );
      setEmail("");
    } catch (error: any) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send reset link.";
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Section - Forget Password Enhanced */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-inactive via-primary to-information">
        {/* Floating Email Icon */}
        <motion.div
          className="absolute opacity-20 text-white top-[15%] left-[10%]"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </motion.div>

        {/* Central Email Blob */}
        <motion.div
          className="relative mb-8"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-36 h-36 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              width="72"
              height="72"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white"
            >
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          {/* Pulse Rings */}
          {["0s", "0.5s", "1s"].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ scale: [0.7, 1.4], opacity: [1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: parseFloat(delay),
              }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <div className="text-center space-y-6 relative z-10 text-white">
          <h1 className="text-4xl font-bold leading-tight">
            Password Recovery
          </h1>
          <motion.p
            className="text-xl text-white/90"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            We'll help you get back in...
          </motion.p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 h-full flex flex-col px-4">
        {/* Go Back */}
        <div className="pt-6">
          <Link to={APP_ROUTES.PUBLIC.LOGIN}>
            <span className="flex items-center text-grey gap-2 hover:text-black transition">
              <ArrowLeft size={20} /> Go Back
            </span>
          </Link>
        </div>

        {/* Form */}
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="w-full max-w-md">
            <Logo />
            <div className="text-start pt-8">
              <h1 className="mt-2 text-3xl font-bold text-black">
                Forget Password?
              </h1>
              <p className="text-sm text-gray-500 pt-2">
                To reset your password, please enter the email address linked to
                your account.
              </p>
            </div>
            <div className="mt-8 space-y-6">
              <Input
                label="Email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                label={loading ? "Sending..." : "Submit"}
                variant="primary"
                className={cn("w-full", loading && "opacity-70")}
                onClick={handleEmail}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pb-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Chatblix. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
