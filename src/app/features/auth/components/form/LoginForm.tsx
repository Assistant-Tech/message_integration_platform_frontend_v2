import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import google from "@/app/assets/icons/google.svg";
import fb from "@/app/assets/icons/fb.svg";
import {
  LoginFormData,
  loginSchema,
} from "@/app/features/auth/schemas/loginSchema";
import { Agreement, Button, Input } from "@/app/components/ui";
import CheckItem from "@/app/features/auth/components/ui/CheckItem";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";
import { handleApiError } from "@/app/utils/handlerApiError";

import { useState } from "react";
import { LockoutTimer } from "@/app/features/auth/components/ui";
import { useLockoutTimer } from "@/app/hooks/useLockoutTimer";

const LoginForm = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const { isLockedOut, lockoutTimeLeft, initiateLockout, formatTime } =
    useLockoutTimer();

  const [showPasswordChecks, setShowPasswordChecks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const password = watch("password") || "";
  const passwordChecks = {
    minLength: password.length >= 6,
    maxLength: password.length <= 64,
    hasLetter: /[A-Za-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[@$!%*?&]/.test(password),
  };

  const onSubmit = async (data: LoginFormData) => {
    if (isLockedOut) return;

    try {
      const res = await login(data.email, data.password);
      toast.success(res.message);

      navigate(res.requiresOnboarding ? "/onboardingform" : "/admin/dashboard");
      reset();
    } catch (error) {
      const parsedError = handleApiError(error);
      if ("message" in parsedError) {
        const errorMessage = parsedError.message;

        const lockoutMessageMatch = errorMessage.match(
          /Your account has been temporarily locked.*,(\d+)\s*minutes remaining/,
        );

        if (lockoutMessageMatch && lockoutMessageMatch[1] !== undefined) {
          const minutes = parseInt(lockoutMessageMatch[1], 10);
          const seconds = minutes * 60;
          toast.error(errorMessage);
          initiateLockout(seconds);
        } else if (
          errorMessage === "Email not verified. Please check your inbox."
        ) {
          toast.error(errorMessage);
          navigate("/check-email", { state: { email: data.email } });
        } else {
          toast.error(errorMessage);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="text-start pt-4">
        <h2 className="text-grey-medium">Welcome Back,</h2>
        <p className="mt-1 font-bold text-3xl">Log in to your account</p>
      </div>

      <AnimatePresence>
        {isLockedOut && (
          <LockoutTimer
            lockoutTimeLeft={lockoutTimeLeft}
            formatTime={formatTime}
          />
        )}
      </AnimatePresence>

      <Input
        label="Email / Phone Number"
        placeholder="Enter your email or phone number"
        {...register("email")}
        error={errors.email?.message}
        disabled={isLockedOut}
      />

      {/* Password input */}
      <div className="relative">
        <Input
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
          type={showPassword ? "text" : "password"}
          onFocus={() => !isLockedOut && setShowPasswordChecks(true)}
          onBlur={() => {
            if (!password) setShowPasswordChecks(false);
          }}
          disabled={isLockedOut}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-[38px] right-3"
          disabled={isLockedOut}
        >
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </button>

        <AnimatePresence>
          {showPasswordChecks && !isLockedOut && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 space-y-1"
            >
              <CheckItem
                label="At least 6 characters"
                condition={passwordChecks.minLength}
              />
              <CheckItem
                label="No more than 64 characters"
                condition={passwordChecks.maxLength}
              />
              <CheckItem
                label="Contains a letter"
                condition={passwordChecks.hasLetter}
              />
              <CheckItem
                label="Contains a number"
                condition={passwordChecks.hasNumber}
              />
              <CheckItem
                label="Has special character (@$!%*?&)"
                condition={passwordChecks.hasSpecialChar}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Remember me + Forgot password */}
      <div
        className={`flex items-center justify-between text-sm ${isLockedOut ? "opacity-50" : ""}`}
      >
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-primary"
            {...register("rememberMe")}
            disabled={isLockedOut}
          />
          Remember Me
        </label>
        <a
          href="/forgot-password"
          className={`text-grey-medium hover:underline ${isLockedOut ? "pointer-events-none" : ""}`}
        >
          Forgot Password?
        </a>
      </div>

      <Button
        label={`Sign In`}
        type="submit"
        className="w-full"
        disabled={isLockedOut}
      />

      {/* Divider */}
      <div
        className={`flex items-center gap-2 text-grey-medium ${isLockedOut ? "opacity-50" : ""}`}
      >
        <hr className="flex-grow border-grey-light" />
        <span className="text-sm">OR</span>
        <hr className="flex-grow border-grey-light" />
      </div>

      {/* Google / Facebook sign-in */}
      <div className="space-y-2">
        <Button
          label="Sign in with Google"
          variant="outlined"
          IconLeft={<img src={google} alt="Google" className="w-5 h-5" />}
          className="w-full"
          disabled={isLockedOut}
        />
        <Button
          label="Sign in with Facebook"
          variant="outlined"
          IconLeft={<img src={fb} alt="Facebook" className="w-5 h-5" />}
          className="w-full"
          disabled={isLockedOut}
        />
      </div>

      <Agreement />

      <p
        className={`text-center text-grey-medium mt-4 ${isLockedOut ? "opacity-50" : ""}`}
      >
        Don't have an account?{" "}
        <a href="/register" className="text-primary hover:underline">
          Register
        </a>
      </p>

      <p className="text-center text-xs text-grey-medium mt-4">
        © 2025 Chatblix. All Rights Reserved
      </p>
    </form>
  );
};

export default LoginForm;
