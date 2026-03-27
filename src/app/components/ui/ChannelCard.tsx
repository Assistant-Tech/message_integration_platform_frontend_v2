import { ProviderCard } from "@/app/types/channel.types";
import { Button } from "@/app/components/ui/";
import { motion } from "framer-motion";
import { MoonStar, Sparkles } from "lucide-react";

const ChannelCard = ({
  card,
  onConnect,
}: {
  card: ProviderCard;
  onConnect: () => void;
}) => {
  const isConnected = card.isConnected;

  const badgeStyles =
    card.badge?.tone === "beta"
      ? "bg-information-light text-information-dark border border-information"
      : card.badge?.tone === "Most Popular"
        ? "bg-secondary-light text-secondary-dark border border-secondary"
        : card.badge?.tone === "popular"
          ? "bg-success-light text-success-dark border border-success"
          : "";

  return (
    <motion.div
      className="relative pt-4 cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {card.badge && (
        <motion.span
          variants={{
            rest: { y: 0 },
            hover: { y: -4 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`
            absolute top-0 left-4 z-20
            inline-flex items-center gap-1
            rounded-md px-2.5 py-1
            label-regular-14 shadow-sm
            ${badgeStyles}
          `}
        >
          {card.badge.label === "Most Popular" ? (
            <MoonStar size={14} />
          ) : (
            <Sparkles size={14} />
          )}
          {card.badge.label}
        </motion.span>
      )}

      <motion.div
        variants={{
          rest: { y: 0, boxShadow: "0 0px 0px rgba(0,0,0,0)" },
          hover: {
            y: -2,
            boxShadow: "0 10px 28px -10px rgba(15, 23, 42, 0.18)",
          },
        }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className={`
          relative overflow-hidden rounded-2xl border border-grey-light
          bg-gradient-to-r ${card.cardGradient ?? "from-white to-grey-light/30"}
          p-8 flex flex-col gap-4
        `}
      >
        <div className="flex flex-row items-start gap-4">
          <div
            className={`h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center p-3 ${card.logoBackgroundColor}`}
          >
            <div
              className="h-full w-full"
              dangerouslySetInnerHTML={{ __html: card.logoSvg }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="h4-semi-bold-24 leading-tight">{card.name}</h3>
            <p className="label-regular-14 text-grey-medium line-clamp-2">
              {card.description}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-auto">
          <Button
            label={isConnected ? "Open Settings" : "Connect"}
            variant={isConnected ? "none" : "outlined"}
            onClick={(e) => {
              e.stopPropagation();
              onConnect();
            }}
            className={
              isConnected
                ? "text-sm underline text-grey-medium hover:text-grey-dark"
                : "text-sm px-5 py-2 rounded-xl border border-grey-light bg-white text-grey-dark hover:bg-grey-50 transition-all font-medium"
            }
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChannelCard;
