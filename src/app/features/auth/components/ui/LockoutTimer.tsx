import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface LockoutTimerProps {
  lockoutTimeLeft: number;
  formatTime: (seconds: number) => string;
}

const LockoutTimer = ({ lockoutTimeLeft, formatTime }: LockoutTimerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
    >
      <Clock className="w-5 h-5 text-red-500 flex-shrink-0" />
      <div className="text-sm text-red-700">
        <p className="font-medium">Account temporarily locked</p>
        <p>
          Too many failed attempts. Please try again in{" "}
          <span className="font-mono font-bold">
            {formatTime(lockoutTimeLeft)}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default LockoutTimer;
