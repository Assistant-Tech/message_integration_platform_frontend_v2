import { motion } from "framer-motion";

const Badge = ({ title }: { title: string }) => {
  return (
    // Dynamic banauna baki
    <motion.div
      className="inline-flex items-center px-4 py-3 rounded-full bg-secondary-light"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="text-secondary body-italic-bold-16 cursor-pointer">
        {title}
      </span>
    </motion.div>
  );
};

export default Badge;
