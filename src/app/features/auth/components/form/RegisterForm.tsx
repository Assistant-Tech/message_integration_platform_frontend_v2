import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import {
  registerSchema,
  RegisterFormData,
} from "@/app/features/auth/schemas/registerSchema";
import { Agreement, Button, Input } from "@/app/components/ui";
import google from "@/app/assets/icons/google.svg";
import circlefb from "@/app/assets/icons/circlefb.svg";
import CheckItem from "@/app/features/auth/components/ui/CheckItem";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const RegisterForm = () => {
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

  const onSubmit = (data: RegisterFormData) => {
    toast.success("Account created successfully!");
    console.log("Register Submitted:", data);
    reset();
  };

  const onError = () => {
    toast.error("Please fix the errors before submitting.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
      {/* Title */}
      <div className="text-start pt-4">
        <h2 className="h5-medium-16 text-grey-medium">
          Let’s get you started,
        </h2>
        <p className="mt-1 h3-bold-32 text-base-black">Create your account</p>
      </div>

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

      {/* Phone Number */}
      <Input
        label="Phone Number"
        placeholder="Enter your phone number"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
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
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
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

      {/* OR */}
      <div className="flex items-center gap-2 text-gray-400">
        <hr className="flex-grow border-gray-300" />
        <span className="text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Social Logins */}
      <div className="space-y-2">
        <Button
          label="Sign in with Google"
          variant="outlined"
          IconLeft={<img src={google} alt="Facebook" className="w-5 h-5" />}
          className="w-full border-grey-light text-grey-medium h5-bold-16"
        />
        <Button
          label="Sign in with Facebook"
          variant="outlined"
          IconLeft={<img src={circlefb} alt="Facebook" className="w-5 h-5" />}
          className="w-full border-grey-light text-grey-medium h5-bold-16"
        />
      </div>

      {/* Login Redirect */}
      <p className="text-center h5-regular-16 text-grey-medium mt-4">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-primary h5-regular-16  hover:underline"
        >
          Log in
        </a>
      </p>

      {/* Copyright */}
      <p className="h5-regular-16 text-grey-medium mt-4 text-center">
        © 2025 Assistant Tech. All Rights Reserved
      </p>
    </form>
  );
};

export default RegisterForm;
