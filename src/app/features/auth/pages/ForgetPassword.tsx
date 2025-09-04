import { Button, Input, Logo } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { forgetPassword } from "@/app/services/auth.services";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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
      const res = await forgetPassword(email);
      toast.success(
        res.message || "A password reset link has been sent to your email.",
      );
      setEmail("");
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
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Section - Forget Password Enhanced */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden">
        {/* CSS Styles */}
        <style>{`
          @keyframes wave {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }

          @keyframes pulse-ring {
            0% {
              transform: scale(0.33);
            }
            40%,
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: scale(1.33);
            }
          }

          @keyframes float-diagonal {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(10px, -10px) rotate(90deg);
            }
            50% {
              transform: translate(0, -20px) rotate(180deg);
            }
            75% {
              transform: translate(-10px, -10px) rotate(270deg);
            }
          }

          @keyframes morphing {
            0%,
            100% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
            50% {
              border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            }
          }

          @keyframes typing {
            0%,
            100% {
              width: 0;
            }
            50% {
              width: 100%;
            }
          }

          .wave-bg {
            background: linear-gradient(
              135deg,
              #1cb496 0%,
              #009951 25%,
              #1cb496 50%,
              #f5576c 75%,
              #4facfe 100%
            );
            background-size: 300% 300%;
            animation: wave 6s ease-in-out infinite;
          }

          .morphing-blob {
            animation: morphing 8s ease-in-out infinite;
          }

          .typing-effect {
            overflow: hidden;
            white-space: nowrap;
            animation: typing 4s ease-in-out infinite;
          }
        `}</style>

        {/* Animated Background */}
        <div className="absolute inset-0 wave-bg"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {/* Email Icons */}
          <div
            className="absolute opacity-15 text-white"
            style={{
              top: "15%",
              left: "10%",
              animation: "float-diagonal 6s ease-in-out infinite",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          <div
            className="absolute opacity-15 text-white"
            style={{
              top: "30%",
              right: "15%",
              animation: "float-diagonal 6s ease-in-out infinite",
              animationDelay: "1s",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="4" />
              <path d="M16 8V6A4 4 0 0 0 8 6V8" />
              <rect x="6" y="8" width="12" height="10" rx="2" />
            </svg>
          </div>

          <div
            className="absolute opacity-15 text-white"
            style={{
              top: "65%",
              left: "20%",
              animation: "float-diagonal 6s ease-in-out infinite",
              animationDelay: "2s",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12L11 14L15 10" />
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
            </svg>
          </div>

          <div
            className="absolute opacity-15 text-white"
            style={{
              bottom: "20%",
              right: "10%",
              animation: "float-diagonal 6s ease-in-out infinite",
              animationDelay: "3s",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col items-center text-white max-w-lg px-8">
          {/* Central Email Icon with Pulse Effect */}
          <div className="relative mb-8">
            <div className="w-36 h-36 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center morphing-blob">
              <svg
                width="72"
                height="72"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            {/* Pulse Rings */}
            <div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              style={{ animation: "pulse-ring 2s ease-out infinite" }}
            ></div>
            <div
              className="absolute inset-0 rounded-full border-2 border-white/20"
              style={{
                animation: "pulse-ring 2s ease-out infinite",
                animationDelay: "0.5s",
              }}
            ></div>
            <div
              className="absolute inset-0 rounded-full border-2 border-white/10"
              style={{
                animation: "pulse-ring 2s ease-out infinite",
                animationDelay: "1s",
              }}
            ></div>
          </div>

          {/* Dynamic Title */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Password Recovery
            </h1>
            <div className="h-8">
              <p className="text-xl text-white/90 typing-effect">
                We'll help you get back in...
              </p>
            </div>
          </div>

          {/* Step Process */}
          <div className="mt-12 space-y-6 w-full">
            <div
              className="flex items-start space-x-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
              style={{ animation: "wave 4s ease-in-out infinite" }}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Enter Your Email
                </h3>
                <p className="text-white/80 text-sm">
                  Provide the email address associated with your account
                </p>
              </div>
            </div>

            <div
              className="flex items-start space-x-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
              style={{
                animation: "wave 4s ease-in-out infinite",
                animationDelay: "0.5s",
              }}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Check Your Inbox
                </h3>
                <p className="text-white/80 text-sm">
                  We'll send you a secure reset link via email
                </p>
              </div>
            </div>

            <div
              className="flex items-start space-x-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
              style={{
                animation: "wave 4s ease-in-out infinite",
                animationDelay: "1s",
              }}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Reset Password
                </h3>
                <p className="text-white/80 text-sm">
                  Follow the link to create your new secure password
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white/80"
              >
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" />
              </svg>
              <span className="text-white/80 text-sm font-medium">Secure</span>
            </div>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white/80"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
              </svg>
              <span className="text-white/80 text-sm font-medium">
                Encrypted
              </span>
            </div>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white/80"
              >
                <path d="M9 12L11 14L15 10" />
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
              </svg>
              <span className="text-white/80 text-sm font-medium">Trusted</span>
            </div>
          </div>
        </div>

        {/* Decorative Particles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full"
            style={{ animation: "wave 3s ease-in-out infinite" }}
          ></div>
          <div
            className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/50 rounded-full"
            style={{
              animation: "wave 3s ease-in-out infinite",
              animationDelay: "1s",
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/6 w-3 h-3 bg-white/30 rounded-full"
            style={{
              animation: "wave 3s ease-in-out infinite",
              animationDelay: "2s",
            }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/6 w-2 h-2 bg-white/35 rounded-full"
            style={{
              animation: "wave 3s ease-in-out infinite",
              animationDelay: "0.5s",
            }}
          ></div>
        </div>
      </div>

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
            © 2025 Chatblix. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
