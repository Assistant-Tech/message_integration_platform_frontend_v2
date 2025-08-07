import { Logo } from "@/app/components/ui";
import verify from "@/app/assets/images/IllustrationVerify.png";
import { useNavigate, useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import { toast } from "sonner";
import { useState } from "react";
import api from "@/app/services/api/api";

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
      await api.post("/auth/verify/resend", { email: resendEmail });
      toast.success(`Verification email resent to ${resendEmail}! Please check your inbox.`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to resend email.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="max-w-screen max-h-screen">
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Logo />
        <img src={verify} alt="verify.png" className="mt-10" />
        <article className="space-y-4 text-center py-8">
          <h1 className="h3-bold-32 text-base-black">Check your Email</h1>
          <p className="body-regular-16 text-grey-medium">
            We’ve sent a verification link to your email address. Please verify
            your email by clicking the link provided. Once verified, you can
            start using our app.
          </p>
          {resendEmail && (
            <h5 className="h5-regular-16 text-grey-medium">
              Didn’t get the email?{' '}
              <span
                className="text-primary underline cursor-pointer"
                onClick={handleResend}
                style={{ pointerEvents: resendLoading ? 'none' : 'auto', opacity: resendLoading ? 0.6 : 1 }}
              >
                {resendLoading ? "Sending..." : `Resend to ${resendEmail}`}
              </span>
            </h5>
          )}
          {!resendEmail && (
            <h5 className="h5-regular-16 text-destructive">
              No email found. Please <span className="underline cursor-pointer text-primary" onClick={() => navigate(APP_ROUTES.PUBLIC.REGISTER)}>register again</span>.
            </h5>
          )}
          <button
            className="bg-primary text-white px-6 py-2 rounded mt-4"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </article>
      </div>
    </div>
  );
};

export default CheckEmail;
