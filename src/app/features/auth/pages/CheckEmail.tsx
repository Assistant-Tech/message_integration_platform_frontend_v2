import { toast } from "sonner";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Logo } from "@/app/components/ui";
import { handleApiError } from "@/app/utils/handlerApiError";
import { CHECK_EMAIL_URL } from "@/app/constants/image-cloudinary";
import { resendEmailVerification } from "@/app/services/auth.services";

const CheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resendEmail = location.state?.email || "";
  const [resendLoading, setResendLoading] = useState(false);

  const handleResend = async () => {
    if (!resendEmail) {
      toast.error("No email found. Please register again.");
      return;
    }

    setResendLoading(true);
    try {
      const res = await resendEmailVerification(resendEmail);
      toast.success(
        res.data?.message ||
          `Verification email resent to ${resendEmail}! Please check your inbox.`,
      );
    } catch (error: string | unknown) {
      const parsedError = handleApiError(error);
      let errorMessage = "Failed to resend email.";

      if (
        parsedError &&
        typeof parsedError === "object" &&
        "message" in parsedError &&
        typeof parsedError.message === "string"
      ) {
        toast.error(parsedError.message);
      } else if (parsedError && parsedError.type === "validation") {
        const firstFormError = Array.isArray(parsedError.formErrors)
          ? parsedError.formErrors[0]
          : undefined;
        const firstFieldError =
          parsedError.fieldErrors && typeof parsedError.fieldErrors === "object"
            ? (Object.values(parsedError.fieldErrors)[0] as unknown as string)?.[0]
            : undefined;

        errorMessage = firstFormError || firstFieldError || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="max-w-screen max-h-screen">
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Logo />
        <img src={CHECK_EMAIL_URL} alt="verify.png" className="mt-10" />
        <article className="space-y-4 text-center py-8 px-6">
          <h1 className="font-bold text-3xl text-gray-900">Check your Email</h1>
          <p className="text-base text-grey-medium">
            We’ve sent a verification link to your email address. Please verify
            your email by clicking the link provided. Once verified, you can
            start using our app.
          </p>
          {resendEmail && (
            <h5 className="text-base text-grey-medium">
              Didn’t get the email?{" "}
              <span
                className={`text-primary underline cursor-pointer ${
                  resendLoading ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={handleResend}
              >
                {resendLoading ? "Sending..." : `Resend to ${resendEmail}`}
              </span>
            </h5>
          )}
          {!resendEmail && (
            <h5 className="text-base text-danger">
              No email found. Please{" "}
              <span
                className="underline cursor-pointer text-primary"
                onClick={() => navigate("/register")}
              >
                register again
              </span>
              .
            </h5>
          )}
          <Button
            label="Go to Login"
            className="w-full mt-4"
            onClick={() => navigate("/login")}
          />
        </article>
      </div>
    </div>
  );
};

export default CheckEmail;
