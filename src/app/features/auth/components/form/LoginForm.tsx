import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import google from "@/app/assets/icons/google.svg";
import fb from "@/app/assets/icons/fb.svg";
import {
  LoginFormData,
  loginSchema,
} from "@/app/features/auth/schemas/login.schema";
import { Agreement, Button, Input } from "@/app/components/ui";
import CheckItem from "@/app/features/auth/components/ui/CheckItem";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";
import { handleApiError } from "@/app/utils/handlerApiError";

import { useRef, useState } from "react";
import { useMfaStore } from "@/app/store/mfa.store";
import RecoveryPhrasesModal from "@/app/features/dashboard/admin/component/mfa/RecoveryCodesModal";
import { APP_ROUTES } from "@/app/constants/routes";

const LoginForm = () => {
  const { login, mfalogin } = useAuthStore();
  const { regenerateBackupCodes } = useMfaStore();
  const navigate = useNavigate();

  const [showPasswordChecks, setShowPasswordChecks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaToken, setMfaToken] = useState<string | null>(null);
  const [useBackup, setUseBackup] = useState<boolean>(false);
  const [backupCode, setBackupCode] = useState("");

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

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [newCodes, setNewCodes] = useState<string[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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

      if ("data" in res && "mfaRequired" in res.data) {
        setMfaStep(true);
        setMfaToken(res.data.mfaToken);
        toast.info(
          "Multi-factor authentication required. Please enter your code.",
        );
        return;
      }

      if ("data" in res && "accessToken" in res.data) {
        toast.success(res.message);
        useAuthStore.getState().setTenantSlug(res.data.tenantSlug);

        if (res.data.requiresOnboarding) {
          navigate(APP_ROUTES.PUBLIC.ONBOARDING_FORM);
        } else {
          navigate(`/${res.data.tenantSlug}/admin/dashboard`);
        }

        reset();
      }
    } catch (error) {
      const parsedError = handleApiError(error);
      if ("message" in parsedError) toast.error(parsedError.message);
    }
  };

  const onSubmitMfa = async () => {
    if (!mfaToken) return;

    try {
      let res;

      if (useBackup) {
        const recoveryPhrase = backupCode.trim().split(/\s+/);

        if (recoveryPhrase.length !== 12) {
          toast.error("Recovery phrase must contain exactly 12 words.");
          return;
        }

        res = await mfalogin(mfaToken, undefined, recoveryPhrase);
      } else {
        const totp = code.join("");
        res = await mfalogin(mfaToken, totp, undefined);
      }

      if (
        "data" in res &&
        "accessToken" in res.data &&
        "tenantSlug" in res.data
      ) {
        const { accessToken, tenantSlug } = res.data;
        useAuthStore.getState().setAccessToken(accessToken);
        useAuthStore.getState().setTenantSlug(tenantSlug);
        toast.success(res.message);

        if (useBackup) {
          try {
            const regenRes = await regenerateBackupCodes();
            setNewCodes(regenRes?.data?.recoveryPhrases ?? null);
            setShowModal(true);
          } catch (error) {
            const parsedError = handleApiError(error);
            if ("message" in parsedError) toast.error(parsedError.message);
          }
        }

        navigate(`/${tenantSlug}/admin/dashboard`);
      } else {
        toast.error("Unexpected response from server during MFA login.");
      }
    } catch (error) {
      const parsedError = handleApiError(error);
      if ("message" in parsedError) toast.error(parsedError.message);
    }
  };

  const handleUseBackupCode = () => {
    setUseBackup(true);
  };

  return (
    <>
      {!mfaStep ? (
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
                    label="Has special character (@$!%*?&) "
                    condition={passwordChecks.hasSpecialChar}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button label="Sign In" type="submit" className="w-full" />
          <button
            className="h5-medium-16 text-primary hover:underline cursor-pointer"
            onClick={handleForgotpassword}
          >
            Forgot Password?
          </button>

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
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>

          <p className="text-center text-xs text-grey-medium mt-4">
            © 2025 Chatblix. All Rights Reserved
          </p>
        </form>
      ) : (
        <form
          id="mfa-form-container"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitMfa();
          }}
          className="space-y-5"
        >
          <h2 className="h3-bold-32 text-grey pt-10">
            Two-Factor Authentication
          </h2>
          <p className="h5-medium-16 text-grey-medium">
            Please enter the 6-digit code from your authenticator app.
          </p>

          {/* MFA Code Input */}
          {useBackup ? (
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="backup-codes">Backup Code</label>
              <Input
                placeholder="Enter the backup code"
                value={backupCode}
                onChange={(e) => setBackupCode(e.target.value)}
                className="mb-4"
              />
            </div>
          ) : (
            <div className="flex justify-center gap-2 py-4">
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pasted = e.clipboardData.getData("text").trim();

                    if (/^\d+$/.test(pasted)) {
                      const chars = pasted.split("");
                      const newCode = [...code];

                      chars.forEach((char, idx) => {
                        if (i + idx < newCode.length) {
                          newCode[i + idx] = char;
                        }
                      });

                      setCode(newCode);

                      // Focus the last filled input
                      const lastIndex = Math.min(
                        i + chars.length - 1,
                        newCode.length - 1,
                      );
                      inputRefs.current[lastIndex]?.focus();
                    }
                  }}
                  ref={(el: any) => (inputRefs.current[i] = el)}
                  className="w-14 h-14 text-center h5-bold-16 border-2 border-grey-light rounded-lg focus:outline-none focus:border-primary"
                />
              ))}
            </div>
          )}

          <Button label="Verify" type="submit" className="w-full" />

          <div className="flex justify-center gap-2 py-4">
            {!useBackup && (
              <Button
                label="Use Backup Code"
                variant="none"
                className="px-4 py-3 cursor-pointer text-information"
                onClick={handleUseBackupCode}
              />
            )}
            {/* Show a button to return to TOTP input */}
            {useBackup && (
              <div className="text-center">
                <Button
                  label="Back to Authenticator App"
                  variant="none"
                  className="py-2 text-information"
                  onClick={() => setUseBackup(false)}
                />
              </div>
            )}

            {showModal && newCodes && (
              <RecoveryPhrasesModal
                codes={newCodes}
                onClose={() => {
                  setShowModal(false);
                  setNewCodes(null);
                }}
              />
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default LoginForm;
