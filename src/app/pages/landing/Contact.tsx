import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  HeadphonesIcon,
  Send,
  CheckCircle2,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import { Footer, Navbar } from "@/app/components/common";
import { Button } from "@/app/components/ui";
import { SectionEyebrow, GradientHeadline, LandingContainer } from "./_shared";

interface ContactProps {
  embedded?: boolean;
}

type Inquiry = "sales" | "support" | "partnership" | "feedback" | "other";

const INQUIRY_OPTIONS: { value: Inquiry; label: string }[] = [
  { value: "sales", label: "Sales inquiry" },
  { value: "support", label: "Technical support" },
  { value: "partnership", label: "Partnership" },
  { value: "feedback", label: "Product feedback" },
  { value: "other", label: "Other" },
];

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: "Email us",
    value: "info@chatblix.com",
    href: "mailto:info@chatblix.com",
    tone: "primary" as const,
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+977-9712039062",
    href: "tel:+977-9712039062",
    tone: "success" as const,
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "TD CORP, Rabibhawan, Kathmandu",
    href: "#",
    tone: "information" as const,
  },
  {
    icon: Clock,
    label: "Working hours",
    value: "Mon–Fri · 9:00 AM – 6:00 PM PST",
    href: "#",
    tone: "secondary" as const,
  },
];

const TONE_STYLES = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  information: "bg-information/10 text-information",
  secondary: "bg-secondary/10 text-secondary",
};

const SUPPORT_OPTIONS = [
  {
    icon: MessageSquare,
    title: "Live chat",
    description:
      "Chat with our team in real-time. Average response under 2 minutes.",
    cta: "Start a chat",
  },
  {
    icon: HeadphonesIcon,
    title: "Help center",
    description:
      "Browse guides, tutorials, and answers to frequently asked questions.",
    cta: "Visit help center",
  },
  {
    icon: Mail,
    title: "Email support",
    description:
      "Send us a detailed request and we'll get back within 24 hours.",
    cta: "support@chatblix.com",
  },
];

const Contact = ({ embedded = false }: ContactProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    inquiry: "sales" as Inquiry,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated submit — wire to real endpoint when available
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="bg-white min-h-screen">
      {!embedded && <Navbar />}

      <main className={embedded ? "pt-6" : "pt-28"}>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-primary-light/40 to-white py-20 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(to right, oklch(88% 0.01 250 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(88% 0.01 250 / 0.4) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 85%)",
            }}
          />

          <LandingContainer className="relative text-center">
            <SectionEyebrow>Contact Us</SectionEyebrow>
            <div className="mt-5">
              <GradientHeadline
                lead="Let's start a"
                accent="conversation"
                as="h1"
                align="center"
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.15 }}
              className="mt-5 mx-auto max-w-2xl body-regular-16 text-grey-medium sm:text-[17px] sm:leading-[28px]"
            >
              Questions about Chatblix, pricing, or a custom plan? Our team is
              here to help. Reach out and we'll respond within one business day.
            </motion.p>
          </LandingContainer>
        </section>

        {/* Contact info cards */}
        <section className="py-14 sm:py-16">
          <LandingContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONTACT_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.a
                    key={card.label}
                    href={card.href}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: i * 0.08 }}
                    className="group rounded-2xl border border-grey-light/60 bg-white p-6 hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${TONE_STYLES[card.tone]} mb-4 group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <p className="label-medium-14 text-grey-medium">
                      {card.label}
                    </p>
                    <p className="mt-1 body-bold-14 text-base-black break-words">
                      {card.value}
                    </p>
                  </motion.a>
                );
              })}
            </div>
          </LandingContainer>
        </section>

        {/* Form + side panel */}
        <section className="pb-20 sm:pb-24">
          <LandingContainer>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Left: Form */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-7 rounded-2xl border border-grey-light/60 bg-white p-6 sm:p-8 shadow-sm"
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success mb-5">
                      <CheckCircle2 className="h-7 w-7" strokeWidth={1.8} />
                    </div>
                    <h3 className="h4-semi-bold-24 text-base-black">
                      Message sent successfully
                    </h3>
                    <p className="mt-3 max-w-md body-regular-14 text-grey-medium">
                      Thanks for reaching out, {form.name || "friend"}. We've
                      received your message and will respond within one business
                      day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          company: "",
                          phone: "",
                          inquiry: "sales",
                          message: "",
                        });
                      }}
                      className="mt-6 text-primary font-semibold hover:underline"
                    >
                      Send another message →
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="h4-semi-bold-24 text-base-black">
                        Send us a message
                      </h2>
                      <p className="mt-2 body-regular-14 text-grey-medium">
                        Fill in the form below and we'll get back to you
                        shortly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="label-semi-bold-14 text-base-black mb-1.5 block"
                        >
                          Full name <span className="text-danger">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          placeholder="Jane Cooper"
                          className="w-full rounded-lg border border-grey-light/80 bg-white px-4 py-2.5 body-regular-14 text-base-black placeholder:text-grey-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="label-semi-bold-14 text-base-black mb-1.5 block"
                        >
                          Work email <span className="text-danger">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="jane@company.com"
                          className="w-full rounded-lg border border-grey-light/80 bg-white px-4 py-2.5 body-regular-14 text-base-black placeholder:text-grey-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-company"
                          className="label-semi-bold-14 text-base-black mb-1.5 block"
                        >
                          Company
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          value={form.company}
                          onChange={(e) =>
                            updateField("company", e.target.value)
                          }
                          placeholder="Acme Inc."
                          className="w-full rounded-lg border border-grey-light/80 bg-white px-4 py-2.5 body-regular-14 text-base-black placeholder:text-grey-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="label-semi-bold-14 text-base-black mb-1.5 block"
                        >
                          Phone
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full rounded-lg border border-grey-light/80 bg-white px-4 py-2.5 body-regular-14 text-base-black placeholder:text-grey-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label-semi-bold-14 text-base-black mb-2 block">
                        What's this about?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {INQUIRY_OPTIONS.map((option) => {
                          const isActive = form.inquiry === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                updateField("inquiry", option.value)
                              }
                              className={`rounded-full px-4 py-2 label-medium-14 transition-all ${
                                isActive
                                  ? "bg-primary text-white shadow-sm"
                                  : "bg-grey-light/40 text-grey-medium hover:bg-grey-light/70"
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="label-semi-bold-14 text-base-black mb-1.5 block"
                      >
                        Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        placeholder="Tell us a bit about what you're looking for..."
                        className="w-full rounded-lg border border-grey-light/80 bg-white px-4 py-3 body-regular-14 text-base-black placeholder:text-grey-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <p className="label-regular-12 text-grey-medium">
                        By submitting, you agree to our{" "}
                        <a
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>
                      <Button
                        variant="primary"
                        type="submit"
                        label={submitting ? "Sending..." : "Send message"}
                        loading={submitting}
                        IconRight={<Send className="h-4 w-4" />}
                      />
                    </div>
                  </form>
                )}
              </motion.div>

              {/* Right: Side panel */}
              <motion.aside
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-5 space-y-6"
              >
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 sm:p-8">
                  <h3 className="h4-semi-bold-24 text-base-black">
                    We're here to help
                  </h3>
                  <p className="mt-3 body-regular-14 text-grey-medium">
                    Whether you're exploring Chatblix for the first time or
                    scaling an existing team, our specialists are ready to guide
                    you to the right solution.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[
                      "Personalized product walkthrough",
                      "Dedicated onboarding support",
                      "Custom pricing for teams 10+",
                      "Enterprise SLA available",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 body-regular-14 text-base-black"
                      >
                        <CheckCircle2
                          className="h-5 w-5 text-success flex-shrink-0 mt-0.5"
                          strokeWidth={1.8}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-grey-light/60 bg-white p-6 sm:p-8">
                  <h3 className="body-bold-16 text-base-black">
                    Follow our journey
                  </h3>
                  <p className="mt-2 body-regular-14 text-grey-medium">
                    Product updates, customer stories, and more.
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    {[
                      { icon: Twitter, label: "Twitter", href: "#" },
                      { icon: Linkedin, label: "LinkedIn", href: "#" },
                      { icon: Github, label: "GitHub", href: "#" },
                    ].map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-grey-light/60 bg-white text-grey-medium hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.8} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.aside>
            </div>
          </LandingContainer>
        </section>

        {/* Support options */}
        <section className="py-20 sm:py-24 bg-grey-light/25">
          <LandingContainer>
            <div className="text-center mb-12">
              <SectionEyebrow>Other ways to reach us</SectionEyebrow>
              <div className="mt-5">
                <GradientHeadline
                  lead="Prefer a different"
                  accent="channel?"
                  as="h2"
                  align="center"
                />
              </div>
              <p className="mt-5 mx-auto max-w-2xl body-regular-16 text-grey-medium">
                Pick whichever works best for you. We're responsive on every
                channel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SUPPORT_OPTIONS.map((option, i) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl border border-grey-light/60 bg-white p-6 sm:p-7 hover:shadow-md transition-shadow"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="body-bold-16 text-base-black">
                      {option.title}
                    </h3>
                    <p className="mt-2 body-regular-14 text-grey-medium">
                      {option.description}
                    </p>
                    <p className="mt-4 label-semi-bold-14 text-primary hover:underline cursor-pointer">
                      {option.cta} →
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </LandingContainer>
        </section>
      </main>

      {!embedded && <Footer />}
    </div>
  );
};

export default Contact;
