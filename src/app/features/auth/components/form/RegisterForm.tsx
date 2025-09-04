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

import { useAuthStore } from "@/app/store/auth.store";
import { handleApiError } from "@/app/utils/handlerApiError";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPasswordChecks, setShowPasswordChecks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isAuthenticating = useAuthStore((s) => s.isloading);
  const signUp = useAuthStore((s) => s.signup);

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
      const res = await signUp(data.name, data.email, data.password);
      toast.success(res?.message || "Registration Successful!");
      reset();
      navigate("/check-email", { state: { email: data.email } });
    } catch (error) {
      const parsedError = handleApiError(error);
      toast.error(
        parsedError.message || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        placeholder="Enter your email address"
        {...register("email")}
        error={errors.email?.message}
      />
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
          onClick={() => setShowPassword((prev) => !prev)}
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

      <Input
        label="Confirm Password"
        placeholder="Re-enter your password"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <div className="mb-4">
        <Agreement />
      </div>

      <Button
        label={isAuthenticating ? "Creating Account..." : "Create Account"}
        type="submit"
        className="w-full"
        disabled={isAuthenticating}
      />
    </form>
  );
};

export default RegisterForm;
