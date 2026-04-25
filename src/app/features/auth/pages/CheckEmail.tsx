import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  MailCheck,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button, Logo } from "@/app/components/ui";
import { handleApiError } from "@/app/utils/handlerApiError";
import { CHECK_EMAIL_URL } from "@/app/constants/image-cloudinary";
import { resendEmailVerification } from "@/app/services/auth.services";
import {
  AuroraBackdrop,
  LandingContainer,
} from "@/app/pages/landing/_shared";

const HEADLINE_LEAD = ["Check", "your"];
const HEADLINE_ACCENT = ["inbox"];

const CheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resendEmail: string = location.state?.email || "";
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
    } catch (error: unknown) {
      const parsedError = handleApiError(error);
      let errorMessage = "Failed to resend email.";

      if (
        parsedError &&
        typeof parsedError === "object" &&
        "message" in parsedError &&
        typeof parsedError.message === "string"
      ) {
        toast.error(parsedError.message);
        setResendLoading(false);
        return;
      }

      if (parsedError && parsedError.type === "validation") {
        const firstFormError = Array.isArray(parsedError.formErrors)
          ? parsedError.formErrors[0]
          : undefined;
        const firstFieldError =
          parsedError.fieldErrors &&
          typeof parsedError.fieldErrors === "object"
            ? (
                Object.values(parsedError.fieldErrors)[0] as unknown as string
              )?.[0]
            : undefined;

        errorMessage = firstFormError || firstFieldError || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <section
      aria-label="Check your email"
      className="relative isolate flex min-h-dvh flex-col overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16"
    >
      <AuroraBackdrop />

      {/* Brand */}
      <LandingContainer className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center sm:justify-start"
        >
          <Logo />
        </motion.div>
      </LandingContainer>

      <LandingContainer className="relative z-10 mt-10 flex flex-1 flex-col items-center justify-center sm:mt-14">
        {/* Status pill — mirrors landing PartnerBadge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-grey-light/70 bg-white/80 px-3.5 py-1.5 shadow-[0_6px_20px_-10px_rgba(46,94,153,0.25)] backdrop-blur-sm"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-information text-white">
            <MailCheck className="h-3 w-3" strokeWidth={2.4} />
          </span>
          <span className="caption-medium-12 font-semibold text-grey">
            Verification email sent
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal with gradient accent */}
        <h1 className="mx-auto mt-6 max-w-3xl text-center font-meri font-bold tracking-[-0.03em] text-grey">
          <span className="block text-[36px] leading-[40px] sm:text-[52px] sm:leading-[56px] lg:text-[64px] lg:leading-[68px]">
            {HEADLINE_LEAD.map((word, i) => (
              <motion.span
                key={`lead-${i}`}
                className="mr-[0.22em] inline-block"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
            {HEADLINE_ACCENT.map((word, i) => (
              <motion.span
                key={`accent-${i}`}
                className="mr-[0.22em] inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-information) 55%, var(--color-secondary) 100%)",
                }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + (HEADLINE_LEAD.length + i) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-xl text-center body-regular-16 text-grey-medium sm:text-[17px] sm:leading-[26px]"
        >
          We&rsquo;ve sent a verification link to your email. Click the link to
          activate your account and get started with Chatblix.
        </motion.p>

        {/* Email chip — shows destination address */}
        {resendEmail && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-grey-light/70 bg-white/70 px-4 py-1.5 caption-medium-12 text-grey-medium backdrop-blur-sm"
          >
            <Mail className="h-3.5 w-3.5 text-primary" strokeWidth={2.2} />
            <span className="truncate font-semibold text-grey">
              {resendEmail}
            </span>
          </motion.div>
        )}

        {/* Illustration — bare, floating with ambient glow */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-8 flex w-full max-w-md flex-col items-center sm:mt-10"
        >
          {/* Soft radial glow behind illustration */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(55%_55%_at_50%_55%,var(--color-primary-light),transparent_70%)] opacity-70 blur-2xl"
          />

          <motion.img
            src={CHECK_EMAIL_URL}
            alt="Verification email illustration"
            loading="eager"
            decoding="async"
            width="320"
            height="320"
            className="h-56 w-auto object-contain sm:h-64 lg:h-72"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Hint pill — standalone, pill-style like landing availability row */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-grey-light/70 bg-white/70 px-3.5 py-1.5 backdrop-blur-sm">
            <Sparkles
              className="h-3.5 w-3.5 text-primary"
              strokeWidth={2.4}
            />
            <span className="caption-medium-12 font-semibold text-grey">
              Don&rsquo;t forget to check your spam folder
            </span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Button
            label="Go to Login"
            variant="primary"
            size="md"
            IconRight={<ArrowRight className="h-4 w-4" strokeWidth={2.2} />}
            className="rounded-full px-6 shadow-[0_14px_30px_-10px_rgba(46,94,153,0.55)] sm:flex-1"
            onClick={() => navigate("/login")}
          />

          {resendEmail ? (
            <Button
              label={resendLoading ? "Sending..." : "Resend email"}
              variant="outlined"
              size="md"
              loading={resendLoading}
              IconLeft={
                !resendLoading ? (
                  <RefreshCw
                    className="h-4 w-4 text-primary"
                    strokeWidth={2}
                  />
                ) : undefined
              }
              className="rounded-full border-grey-light/70 bg-white/70 px-5 text-grey backdrop-blur-sm hover:border-primary/40 sm:flex-1"
              onClick={handleResend}
            />
          ) : (
            <Button
              label="Register again"
              variant="outlined"
              size="md"
              className="rounded-full border-grey-light/70 bg-white/70 px-5 text-grey backdrop-blur-sm hover:border-primary/40 sm:flex-1"
              onClick={() => navigate("/register")}
            />
          )}
        </motion.div>

        {/* Reassurance strip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="mt-5 flex items-center justify-center gap-2 caption-medium-12 text-grey-medium"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-success" strokeWidth={2} />
          Links expire in 24 hours · Your account stays secure
        </motion.p>

        {/* Fallback helper when no email in state */}
        {!resendEmail && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.4 }}
            className="mt-3 caption-medium-12 text-danger"
          >
            No email found in this session. Please register again to receive a
            new link.
          </motion.p>
        )}
      </LandingContainer>
    </section>
  );
};

export default CheckEmail;
