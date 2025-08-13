import { Button, Input, Logo } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ForgetPassword as forgetPasswordApi } from "@/app/services/auth.services";

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await forgetPasswordApi(email);
      toast.success(
        res.message || "A password reset link has been sent to your email.",
      );
      setEmail("");
    } catch (error: any) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send reset link.";
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Section */}
      <div className="hidden md:block w-1/2 h-full bg-base-white" />

      {/* Right Section */}
      <div className="w-full md:w-1/2 h-full flex flex-col px-4">
        {/* Go Back Link */}
        <div className="pt-6">
          <Link to={APP_ROUTES.PUBLIC.LOGIN}>
            <span className="flex items-center text-grey gap-2 hover:text-black transition">
              <ArrowLeft size={20} /> Go Back
            </span>
          </Link>
        </div>

        {/* Centered Form */}
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="w-full max-w-md">
            <Logo />
            <div className="text-start pt-8">
              <h1 className="mt-2 h3-bold-32 text-base-black">
                Forget Password?
              </h1>
              <p className="h5-medium-16 text-grey-medium pt-2">
                To reset your password, please enter the email address linked to
                your account.
              </p>
            </div>
            <div className="mt-8">
              <Input
                label="Email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                label={loading ? "Sending..." : "Submit"}
                variant="primary"
                className="mt-6 w-full"
                onClick={handleEmail}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pb-6 text-center">
          <p className="h5-bold-16 text-grey-medium">
            © 2025 Assistant Tech. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
