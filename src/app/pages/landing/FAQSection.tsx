import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/app/utils/cn";
import landing from "@/app/content/json/landing.json";
import {
  GradientHeadline,
  SectionEyebrow,
  LandingContainer,
} from "./_shared";

const { faq } = landing;

const FAQSection = () => {
  const [openId, setOpenId] = useState<string>(faq.defaultOpenId);

  return (
    <section
      aria-label="Frequently asked questions"
      id="faq"
      className="relative py-28 sm:py-36"
    >
      <LandingContainer className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: heading */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-5">
            <SectionEyebrow align="left">{faq.eyebrow}</SectionEyebrow>
            <GradientHeadline lead={faq.title} as="h2" align="left" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="max-w-md body-regular-16 text-grey-medium"
            >
              {faq.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="lg:col-span-7">
          <ul className="space-y-3">
            {faq.items.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-white transition-colors",
                    isOpen
                      ? "border-primary/30 shadow-[0_24px_50px_-30px_rgba(46,94,153,0.3)]"
                      : "border-grey-light/70 hover:border-primary/20",
                  )}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenId((prev) => (prev === item.id ? "" : item.id))
                    }
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <span className="body-semi-bold-16 text-grey sm:text-[17px]">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors",
                        isOpen
                          ? "bg-primary text-white"
                          : "bg-grey-light/50 text-grey-medium",
                      )}
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex"
                      >
                        {isOpen ? (
                          <Minus className="h-4 w-4" strokeWidth={2.2} />
                        ) : (
                          <Plus className="h-4 w-4" strokeWidth={2.2} />
                        )}
                      </motion.span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${item.id}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 label-regular-14 text-grey-medium sm:text-[15px] sm:leading-[24px]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </LandingContainer>
    </section>
  );
};

export default FAQSection;
