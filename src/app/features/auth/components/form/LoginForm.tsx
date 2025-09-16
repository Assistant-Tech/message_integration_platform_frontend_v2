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

const LoginForm = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

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

  const handleForgotpassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.info("Redirecting to forgot password page...");
    navigate("/forgot-password");
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data.email, data.password);
      toast.success(res.message);

      useAuthStore.getState().setTenantSlug(res.tenantSlug);

      if (res.requiresOnboarding) {
        toast.info("Please complete your onboarding.");
        navigate("/onboardingform");
      } else {
        const tenantSlug = res.tenantSlug;
        navigate(`/${tenantSlug}/admin/dashboard`);
      }

      navigate(
        res.requiresOnboarding
          ? "/onboardingform"
          : `/${res.tenantSlug}/admin/dashboard`,
      );
      reset();
    } catch (error) {
      const parsedError = handleApiError(error);
      if ("message" in parsedError) {
        const errorMessage = parsedError.message;

        if (errorMessage === "Email not verified. Please check your inbox.") {
          toast.error(errorMessage);
          navigate("/check-email", { state: { email: data.email } });
        } else {
          console.log("Login error:", errorMessage);
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

      <Input
        label="Email / Phone Number"
        placeholder="Enter your email or phone number"
        {...register("email")}
        error={errors.email?.message}
      />

      {/* Password input */}
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
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-[38px] right-3"
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

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-primary"
            {...register("rememberMe")}
          />
          Remember Me
        </label>
        <button
          type="button"
          onClick={handleForgotpassword}
          className="text-grey-medium hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <Button label="Sign In" type="submit" className="w-full" />

      {/* Divider */}
      <div className="flex items-center gap-2 text-grey-medium">
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
        />
        <Button
          label="Sign in with Facebook"
          variant="outlined"
          IconLeft={<img src={fb} alt="Facebook" className="w-5 h-5" />}
          className="w-full"
        />
      </div>

      <Agreement />

      <p className="text-center text-grey-medium mt-4">
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
