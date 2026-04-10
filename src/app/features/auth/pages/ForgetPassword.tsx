import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { Button, Input, Logo } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { LOGIN_IMAGE_URL } from "@/app/constants/image-cloudinary";
import { forgetPassword } from "@/app/services/auth.services";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
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
      setSent(true);
    } catch (error: unknown) {
      let backendMessage = "Failed to send reset link.";

      if (error && typeof error === "object") {
        const axiosErr = error as AxiosError<{ message?: string }>;
        backendMessage =
          axiosErr.response?.data?.message ??
          axiosErr.message ??
          backendMessage;
      }

      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section — image (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-base-white p-8">
        <div className="w-full max-w-md flex flex-col items-center text-center">
          <img
            src={LOGIN_IMAGE_URL}
            alt="Forgot password illustration"
            className="w-full h-80 object-contain"
          />
          <h2 className="h3-bold-32 text-base-black mt-8 mb-3">
            Don't Worry, We've Got You
          </h2>
          <p className="body-regular-16 text-grey-medium">
            It happens to the best of us. Enter your email and we'll send you a
            secure link to reset your password in seconds.
          </p>
        </div>
      </div>

      {/* Right Section — form */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen px-4 py-6 sm:px-8">
        {/* Back link */}
        <Link
          to={APP_ROUTES.PUBLIC.LOGIN}
          className="inline-flex items-center gap-2 text-grey hover:text-base-black transition-colors w-fit"
        >
          <ArrowLeft size={18} />
          <span className="h5-medium-16">Back to Login</span>
        </Link>

        {/* Centered form */}
        <div className="flex flex-col justify-center items-center flex-1">
          <div className="w-full max-w-md">
            <Logo />

            {!sent ? (
              <>
                {/* Heading */}
                <div className="text-start pt-8">
                  <h1 className="h3-bold-32 text-base-black">
                    Forgot Password?
                  </h1>
                  <p className="h5-medium-16 text-grey-medium mt-2">
                    Enter the email address linked to your account and we'll send
                    you a reset link.
                  </p>
                </div>

                {/* Form */}
                <div className="mt-8 space-y-5">
                  <Input
                    label="Email"
                    placeholder="Enter your email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmit();
                    }}
                  />

                  <Button
                    label={loading ? "Sending..." : "Send Reset Link"}
                    variant="primary"
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={loading}
                  />
                </div>

                {/* Help text */}
                <p className="text-center text-grey-medium mt-6 body-regular-16">
                  Remember your password?{" "}
                  <Link
                    to={APP_ROUTES.PUBLIC.LOGIN}
                    className="text-primary hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </>
            ) : (
              /* Success state */
              <div className="pt-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light mb-6">
                  <Mail className="h-8 w-8 text-primary" />
                </div>

                <h1 className="h3-bold-32 text-base-black">Check Your Email</h1>
                <p className="h5-medium-16 text-grey-medium mt-3 max-w-sm mx-auto">
                  We've sent a password reset link to{" "}
                  <span className="font-semibold text-grey">{email}</span>.
                  Please check your inbox.
                </p>

                <div className="mt-8 space-y-3">
                  <Button
                    label="Open Email App"
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      window.open("https://mail.google.com", "_blank");
                    }}
                  />
                  <Button
                    label={loading ? "Resending..." : "Resend Link"}
                    variant="none"
                    className="w-full border border-grey-light text-grey hover:bg-grey-light/50"
                    onClick={handleSubmit}
                    disabled={loading}
                  />
                </div>

                <p className="text-center text-grey-medium mt-6 body-regular-16">
                  Wrong email?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setEmail("");
                    }}
                    className="text-primary hover:underline"
                  >
                    Try again
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 text-center">
          <p className="text-xs text-grey-medium">
            &copy; 2025 Chatblix. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
