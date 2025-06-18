import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import loginImage from "@/app/assets/images/loginImage.png";
import { Input, Logo, Button } from "@/app/components/ui";

const LoginOTP: React.FC = () => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeRemaining, setTimeRemaining] = useState(59);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    alert(`Verification code submitted: ${fullCode}`);
  };

  const handleResendCode = () => {
    setTimeRemaining(59);
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex flex-col w-1/2 items-center justify-center bg-base-white">
        <div>
          <img src={loginImage} className="w-96 h-auto" />
        </div>
        <div className="mt-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Seamless Experience, Anytime, Anywhere
          </h2>
          <p className="text-gray-600 leading-relaxed text-center">
            Stay synced across all devices, both mobile and desktop. No matter
            where you are, enjoy a smooth and seamless experience.
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md  rounded-2xl light p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-center mb-16">
            <Logo />
          </div>

          {/* Code Input Fields */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center gap-3 mb-8"
          >
            {code.map((digit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              >
                <Input
                  placeholder="0"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-bold border-2 transition-all duration-200 ${
                    digit
                      ? "border-primary bg-primary-light"
                      : "border-secondary hover:border-secondary focus:border-primary"
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Submit Button */}
          <div className="flex justify-center items-center">
            <Button label="Submit" variant="primary" />
          </div>

          {/* Timer and Resend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center mt-6"
          >
            <AnimatePresence mode="wait">
              {timeRemaining > 0 ? (
                <motion.p
                  key="timer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-600 mb-4"
                >
                  This code will expire in{" "}
                  <span className="text-red-500 font-bold">
                    {timeRemaining} seconds
                  </span>
                </motion.p>
              ) : (
                <motion.p
                  key="expired"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 font-semibold mb-4"
                >
                  Code has expired
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-gray-600">
              Didn't receive the code?{" "}
              <button
                onClick={handleResendCode}
                className="text-primary-light font-semibold hover:text-primary transition-colors underline"
              >
                Resend code
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginOTP;
