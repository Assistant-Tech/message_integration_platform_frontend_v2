import { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Sunrise, Sun, Moon } from "lucide-react";
import { getGreeting } from "./constants";

const GREETING_ICONS = {
  sunrise: Sunrise,
  sun: Sun,
  moon: Moon,
} as const;

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const now = new Date();
  const { greeting, emoji } = useMemo(() => getGreeting(now.getHours()), []);
  const GreetingIcon = GREETING_ICONS[emoji as keyof typeof GREETING_ICONS];

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const firstName = userName?.split(" ")[0] || "there";

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-primary to-primary-dark/90 px-6 py-6 md:px-8 md:py-7"
    >
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <GreetingIcon
              className="h-5 w-5 text-secondary"
              strokeWidth={1.8}
            />
            <p className="label-semi-bold-14 text-secondary">{greeting}</p>
          </div>
          <h1 className="h2-bold-40 text-white">{firstName}</h1>
          <p className="body-regular-16 mt-1 text-primary-light/80">
            Here&apos;s what&apos;s happening with your conversations today
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm">
            <Calendar
              className="h-4 w-4 text-primary-light"
              strokeWidth={1.8}
            />
            <span className="label-semi-bold-14 text-white">
              {formattedDate}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-primary-light" strokeWidth={1.8} />
            <span className="label-semi-bold-14 text-white">
              {formattedTime}
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
