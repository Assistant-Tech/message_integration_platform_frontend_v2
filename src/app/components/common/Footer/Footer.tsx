import { useState } from "react";
import { footerLinks, SocialFooter } from "@/app/utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Logo } from "@/app/components/ui";
import {
  ChevronDown,
  Apple,
  Play,
  ArrowRight,
  Mail,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import landing from "@/app/content/json/landing.json";

const { footer } = landing;

const SECTION_ORDER = ["products", "resources", "pricing", "contact"] as const;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer
      id="footer-observer"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-primary-light/30 to-primary-light/60"
    >
      {/* Decorative aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(800px 400px at 85% 30%, oklch(65% 0.16 245 / 0.18), transparent 70%), radial-gradient(600px 350px at 15% 40%, oklch(72% 0.16 55 / 0.12), transparent 70%)",
        }}
      />

      {/* CTA band */}
      <div className="mx-auto w-full max-w-[1600px] px-4 pt-20 sm:px-6 md:px-8 xl:px-12 2xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[32px] border border-primary/20 bg-gradient-to-br from-primary via-information to-primary-dark px-6 py-12 text-white sm:px-12 sm:py-16 shadow-[0_50px_100px_-40px_rgba(46,94,153,0.55)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse 90% 70% at 20% 50%, black 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 70% at 20% 50%, black 30%, transparent 80%)",
            }}
          />
          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="caption-medium-12 uppercase tracking-[0.2em] text-white/70">
                Launching today
              </p>
              <h3 className="mt-3 font-meri text-[32px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[44px]">
                Your inbox is waiting.
              </h3>
              <p className="mt-4 max-w-md body-regular-16 text-white/85">
                Connect your channels in under 10 minutes. Let your AI start
                replying tonight.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link to="/register" className="contents">
                <Button
                  label="Start Free Trial"
                  variant="neutral"
                  size="md"
                  IconRight={
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  }
                  className="rounded-full px-6 text-primary shadow-[0_14px_30px_-10px_rgba(0,0,0,0.3)]"
                />
              </Link>
              <a href="#faq" className="contents">
                <Button
                  label="Read the FAQ"
                  variant="none"
                  size="md"
                  className="rounded-full border border-white/40 bg-white/10 px-6 text-white backdrop-blur-sm hover:bg-white/20"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main columns */}
      <div className="mx-auto w-full max-w-[1600px] px-4 pt-20 sm:px-6 md:px-8 xl:px-12 2xl:px-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-sm body-regular-16 text-grey">
              {footer.tagline}
            </p>

            {/* Store buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#ios"
                className="inline-flex h-12 items-center gap-3 rounded-2xl bg-grey px-5 text-white transition-colors hover:bg-base-black"
              >
                <Apple className="h-5 w-5" fill="white" strokeWidth={0} />
                <span className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-white/70">
                    Download on
                  </span>
                  <span className="text-[14px] font-bold">App Store</span>
                </span>
              </a>
              <a
                href="#android"
                className="inline-flex h-12 items-center gap-3 rounded-2xl bg-grey px-5 text-white transition-colors hover:bg-base-black"
              >
                <Play className="h-4 w-4" fill="white" strokeWidth={0} />
                <span className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-white/70">
                    Get it on
                  </span>
                  <span className="text-[14px] font-bold">Google Play</span>
                </span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="w-full">
            {/* Mobile accordion */}
            <div className="space-y-2 lg:hidden">
              {SECTION_ORDER.map((section) => (
                <div key={section} className="border-b border-grey-light/60">
                  <button
                    onClick={() => toggleSection(section)}
                    className="flex w-full items-center justify-between py-3 text-left body-semi-bold-16 capitalize text-grey"
                  >
                    <span>{section}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openSection === section ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openSection === section && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pb-3 pl-1 space-y-2"
                      >
                        {footerLinks[section].map((link, i) => (
                          <li key={i}>
                            <a
                              href={link.url}
                              className="flex items-center label-regular-14 text-grey-medium transition-colors hover:text-primary"
                            >
                              {"icon" in link && link.icon && (
                                <link.icon className="mr-2 h-3.5 w-3.5" />
                              )}
                              {link.name}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop grid */}
            <div className="hidden grid-cols-4 gap-10 lg:grid">
              {SECTION_ORDER.map((section) => (
                <nav key={section} aria-label={section}>
                  <h3 className="label-semi-bold-14 uppercase tracking-[0.15em] text-grey-medium">
                    {section}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {footerLinks[section].map((link, i) => (
                      <li
                        key={i}
                        className="flex justify-start items-center gap-2"
                      >
                        {"icon" in link && link.icon && (
                          <link.icon className="mr-2 h-3.5 w-3.5 shrink-0" /> // Added shrink-0 here
                        )}
                        <a
                          href={link.url}
                          className="flex items-center label-regular-14 text-grey transition-colors hover:text-primary"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <NewsletterRow />

        {/* Meta row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-grey-light/60 py-6 sm:flex-row">
          <p className="caption-medium-12 text-grey-medium">
            &copy; {currentYear} Chatblix. All rights reserved.
          </p>
          <nav aria-label="social media">
            <ul className="flex gap-4">
              {SocialFooter.map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <a
                    href={item.href}
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-grey-light/70 bg-white/70 backdrop-blur-sm transition-colors hover:border-primary/40"
                  >
                    <img
                      src={item.src}
                      alt={`${item.name} icon`}
                      className="h-4 w-4"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Giant wordmark — solid primary at top, fades to white only near the bottom */}
      <div className="relative mt-10 overflow-hidden bg-transparent">
        <motion.h2
          aria-hidden
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="select-none text-center font-meri font-black leading-[0.85] bg-clip-text text-transparent"
          style={{
            // Primary solid for the top ~65% of each letter, then fade fast
            // through a mid tone to pure white at the bottom.
            backgroundImage:
              "linear-gradient(180deg, var(--color-primary-dark) 0%, var(--color-primary) 30%, var(--color-primary) 62%, oklch(58% 0.13 250) 78%, oklch(82% 0.06 245) 92%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            fontSize: "clamp(72px, 22vw, 320px)",
            letterSpacing: "-0.05em",
            paddingBottom: "0.08em",
          }}
        >
          {footer.wordmark}
        </motion.h2>
        {/* Thin bottom seal so the fade-out lands cleanly on white */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-white to-transparent"
        />
      </div>
    </footer>
  );
};

/**
 * Footer newsletter capture — pre-launch "get updates" strip. Uses the shared
 * Input (pill shape) and Button primitives so styling stays in one place.
 */
const NewsletterRow = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Enter your email so we know where to send the good news.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email looks off — mind double-checking?");
      return;
    }
    setError(undefined);
    setStatus("submitting");
    // TODO(wire-up): POST to newsletter endpoint when backend is live.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 rounded-3xl border border-grey-light/60 bg-white/75 p-6 shadow-[0_24px_50px_-30px_rgba(46,94,153,0.25)] backdrop-blur-sm sm:p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-lg">
          <p className="caption-medium-12 font-semibold uppercase tracking-[0.18em] text-primary">
            Stay in the loop
          </p>
          <h4 className="mt-2 font-meri text-[22px] font-bold leading-[1.2] text-grey sm:text-[26px]">
            Get launch updates & product news.
          </h4>
          <p className="mt-1 label-regular-14 text-grey-medium">
            One email. Only when something worth your inbox happens.
          </p>
        </div>

        {status === "success" ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-success-light px-4 py-3 label-semi-bold-14 text-success-dark">
            <Check className="h-4 w-4" strokeWidth={2.4} /> You're on the list —
            talk soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-start"
            noValidate
          >
            <div className="flex-1">
              <Input
                variant="email"
                shape="pill"
                placeholder="you@work.com"
                aria-label="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(undefined);
                }}
                iconLeft={<Mail className="h-4 w-4" strokeWidth={1.8} />}
                error={error}
                disabled={status === "submitting"}
              />
            </div>
            <Button
              type="submit"
              label={status === "submitting" ? "Subscribing…" : "Notify me"}
              variant="primary"
              size="md"
              loading={status === "submitting"}
              IconRight={
                status === "submitting" ? undefined : (
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                )
              }
              className="rounded-full px-6"
            />
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default Footer;
