import { motion } from "framer-motion";
import landing from "@/app/content/json/landing.json";
import { MarqueeRow, LandingContainer } from "./_shared";

import whatsappIcon from "@/app/assets/dashboard-icons/whatsapp.svg";
import instaIcon from "@/app/assets/dashboard-icons/insta.svg";
import fbIcon from "@/app/assets/dashboard-icons/fb.svg";
import telegramIcon from "@/app/assets/dashboard-icons/telegram.svg";
import tiktokIcon from "@/app/assets/dashboard-icons/tiktok.svg";

const { integrations } = landing;

const ICON_MAP: Record<string, string> = {
  whatsapp: whatsappIcon,
  instagram: instaIcon,
  messenger: fbIcon,
  meta: fbIcon,
  telegram: telegramIcon,
  tiktok: tiktokIcon,
};

const IntegrationStrip = () => {
  const chips = integrations.items.map((item) => (
    <div
      key={item.name}
      className="flex items-center gap-2.5 rounded-2xl border border-grey-light/60 bg-white/80 px-5 py-3 backdrop-blur-sm transition-colors hover:border-primary/30"
    >
      <img
        src={ICON_MAP[item.icon] ?? whatsappIcon}
        alt={`${item.name} logo`}
        loading="lazy"
        className="h-6 w-6"
      />
      <span className="label-semi-bold-14 text-grey">{item.name}</span>
    </div>
  ));

  return (
    <section
      aria-label="Integrations"
      className="relative py-14 sm:py-16"
    >
      <LandingContainer>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center caption-medium-12 font-semibold uppercase tracking-[0.18em] text-grey-medium"
        >
          {integrations.eyebrow}
        </motion.p>

        <div className="mt-8">
          <MarqueeRow duration={34} gap="md">
            {chips}
          </MarqueeRow>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-6 flex items-center justify-center gap-2 caption-medium-12 text-grey-medium"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          {integrations.note}
        </motion.p>
      </LandingContainer>
    </section>
  );
};

export default IntegrationStrip;
