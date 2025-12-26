import { useAuthStore } from "@/app/store/auth.store";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const verifyEmail = useAuthStore((state) => state.verifyEmail);

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const hasVerifiedRef = useRef(false);

  useEffect(() => {
    if (hasVerifiedRef.current) return;
    hasVerifiedRef.current = true;

    const performVerification = async () => {
      if (!token) {
        toast.error("Invalid verification link.");
        navigate("/register");
        return;
      }

      try {
        const res = await verifyEmail(token);
        toast.success(res?.message || "Email verified successfully!");
        setVerified(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        toast.error("Email verification failed.");
        console.log("error", error);
        navigate("/register");
      } finally {
        setLoading(false);
      }
    };

    performVerification();
  }, [token, navigate, verifyEmail]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-information" size={48} />
          <p className="text-lg font-semibold text-grey-medium">
            Verifying your email...
          </p>
        </div>
      ) : verified ? (
        <div className="flex flex-col items-center gap-4">
          <CheckCircle2 className="text-primary" size={56} />
          <p className="text-lg font-semibold text-gray-700">
            Email verified successfully! Redirecting to login...
          </p>
        </div>
      ) : (
        <p className="text-lg font-semibold text-grey-medium">Redirecting...</p>
      )}
    </div>
  );
};

export default VerifyEmail;
