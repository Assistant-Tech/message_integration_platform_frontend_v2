import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  registerSchema,
  RegisterFormData,
} from "@/app/features/auth/schemas/registerSchema";
import { Agreement, Button, Input } from "@/app/components/ui";
import CheckItem from "@/app/features/auth/components/ui/CheckItem";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import api from "@/app/services/api/api";
import { APP_ROUTES } from "@/app/constants/routes";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPasswordChecks, setShowPasswordChecks] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
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

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post("/auth/signup", {
        name: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      toast.success("Account created successfully!");
      reset();
      navigate(APP_ROUTES.AUTH.CHECK_EMAIL, { state: { email: data.email } });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  const onError = () => {
    toast.error("Please fix the errors before submitting.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
      {/* Full Name */}
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        {...register("fullName")}
        error={errors.fullName?.message}
      />

      {/* Email */}
      <Input
        label="Email"
        placeholder="Enter your email address"
        {...register("email")}
        error={errors.email?.message}
      />

      {/* Password */}
      <div className="relative">
        <Input
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
          type={showPassword ? "text" : "password"}
          onFocus={() => setShowPasswordChecks(true)}
          onBlur={() => {
            if (!password) setShowPasswordChecks(false);
          }}
          className="pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-[38px] right-3 flex items-center justify-center w-6 h-6 cursor-pointer"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeIcon color="grey" />
          ) : (
            <EyeOffIcon color="grey" />
          )}
        </button>

        <AnimatePresence>
          {showPasswordChecks && (
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

      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        placeholder="Re-enter your password"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      {/* Agrement */}
      <div className="mb-4">
        <Agreement />
      </div>

      {/* Submit */}
      <Button label="Create Account" type="submit" className="w-full" />
    </form>
  );
};

export default RegisterForm;
