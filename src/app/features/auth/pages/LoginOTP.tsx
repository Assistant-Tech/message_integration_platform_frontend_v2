import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo, Button } from "@/app/components/ui/";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import { APP_ROUTES } from "@/app/constants/routes";
import { ArrowLeft } from "lucide-react";

const LoginOTP: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setTimeRemaining(59);
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = () => {
    if (code.length === 6) {
      toast.success(`Verification code submitted: ${code}`);
    } else {
      toast.error("Please enter all 6 digits.");
    }
  };

  const handleResendCode = () => {
    setCode("");
    startTimer();
  };

  useLayoutEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = code.split("");
    newCode[index] = value;
    const updated = newCode.join("").padEnd(6, "");
    setCode(updated);

    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (value && nextInput) nextInput.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="hidden bg-base-white md:flex flex-col w-1/2 items-center justify-center px-10">
        <img
          src={
            "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1756630890/loginImage_dhul1r.png"
          }
          alt="Login Visual"
          className="w-96 h-auto"
        />
        <div className="mt-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Seamless Experience, Anytime, Anywhere
          </h2>
          <p className="text-gray-600">
            Stay synced across all devices, both mobile and desktop. Enjoy a
            smooth and seamless experience.
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
        {/* OTP FORM */}
        <div className="flex flex-col justify-center items-center flex-grow py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl"
          >
            <div className="flex justify-center mb-10">
              <Logo />
            </div>

            {/* OTP Fields */}
            <div className="flex justify-center gap-2">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={code[i] || ""}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button label="Submit" onClick={handleSubmit} />
            </div>

            {/* Countdown & Resend */}
            <div className="text-center mt-6 space-y-2">
              <AnimatePresence mode="wait">
                {timeRemaining > 0 ? (
                  <motion.p
                    key="timer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-600"
                  >
                    This code will expire in{" "}
                    <span className="text-destructive font-semibold">
                      {timeRemaining} seconds
                    </span>
                  </motion.p>
                ) : (
                  <motion.p
                    key="expired"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-destructive font-semibold"
                  >
                    Code has expired
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="text-sm text-muted-foreground">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendCode}
                  className="text-primary font-medium hover:underline"
                >
                  Resend code
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginOTP;
