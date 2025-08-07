import { Logo } from "@/app/components/ui";
import verify from "@/app/assets/images/IllustrationVerify.png";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/app/services/api/api";
import { APP_ROUTES } from "@/app/constants/routes";

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof token === "undefined") {
      setStatus("loading");
      setMessage("Please wait, verifying your email...");
      return;
    }
    if (!token) {
      setStatus("loading");
      setMessage("Please wait, verifying your email...");
      timerRef.current = setTimeout(() => {
        setStatus("error");
        setMessage("Invalid or missing verification token.");
      }, 5000);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    // If token is present, clear any previous timer
    if (timerRef.current) clearTimeout(timerRef.current);

    const verify = async () => {
      setStatus("loading");
      setMessage("Please wait, verifying your email...");
      try {
        await api.get(`/auth/verify/${token}`);
        setStatus("success");
        setMessage("Email verified successfully! Redirecting to onboarding...");
        setTimeout(() => {
          navigate(
            `${APP_ROUTES.PUBLIC.ONBOARDING_FORM}/${APP_ROUTES.PUBLIC.ONBOARDING_FORM_STEP_1}`,
          );
        }, 2000);
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "Verification failed. Please try again.",
        );
      }
    };

    verify();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [token, navigate]);

  return (
    <div className="max-w-screen max-h-screen">
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Logo />
        <img src={verify} alt="verify.png" className="mt-10" />
        <article className="space-y-4 text-center py-8">
          <h1 className="h3-bold-32 text-base-black">
            {status === "loading"
              ? "Verifying your Email Address..."
              : status === "success"
                ? "Email Verified!"
                : "Verification Failed"}
          </h1>
          <p className="body-regular-16 text-grey-medium">{message}</p>
        </article>
      </div>
    </div>
  );
};

export default VerifyEmail;
