import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedProcessCardProps {
  processes: string[];
}

const AnimatedProcessCard: React.FC<AnimatedProcessCardProps> = ({
  processes,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % processes.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [processes.length]);

  return (
    <div className="relative">
      <AnimatePresence>
        {processes.map(
          (process, index) =>
            index <= currentIndex && (
              <motion.div
                key={`${process}-${index}`}
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: {
                    delay: index * 0.3,
                    duration: 0.5,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  transition: { duration: 0.3 },
                }}
                className="absolute top-0 left-0 bg-secondary text-white px-4 py-3 rounded-lg shadow-lg body-medium-16 whitespace-nowrap mb-2"
                style={{
                  zIndex: processes.length - index,
                  top: `${index * 60}px`,
                }}
              >
                <div className="flex items-center gap-2">{process}</div>
              </motion.div>
            ),
        )}
      </AnimatePresence>
    </div>
  );
};
export default AnimatedProcessCard;
