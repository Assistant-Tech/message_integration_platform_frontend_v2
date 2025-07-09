import { motion } from "framer-motion";

type BadgeProps = {
  text: string;
};

const FeatureBadge = ({ text }: BadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
    >
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
      <span className="label-regular-14 font-medium text-primary">{text}</span>
    </motion.div>
  );
};
export default FeatureBadge;
