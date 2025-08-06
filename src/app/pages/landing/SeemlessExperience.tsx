import React from "react";
import { motion } from "framer-motion";
import { Badge, StoreButtons } from "@/app/components/ui/";
import {
  Smartphone,
  Monitor,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";

import play from "@/app/assets/icons/play.svg";
import app from "@/app/assets/icons/app.svg";

interface StatsCardProps {
  value: string;
  label: string;
  trend: "up" | "down";
  delay: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  trend,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl text-white shadow-lg"
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-2xl font-bold">{value}</span>
      <TrendingUp
        className={`w-4 h-4 ${trend === "up" ? "text-green-300" : "text-red-300"}`}
      />
    </div>
    <p className="text-sm opacity-90">{label}</p>
  </motion.div>
);

const SeemlessExperience: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const storeLinks = [
    { img: app, label: "App Store" },
    { img: play, label: "Google Play" },
  ];

  return (
    <div className="bg-gradient-to-br via-primary-light to-primary flex items-center justify-center p-4 md:p-24 rounded-2xl mb-36">
      <div className=" w-full grid lg:grid-cols-2 gap-24 items-center">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <Badge title="Cross-Platform Solution" />

            <h1 className="h2-bold-40 text-base-black">
              Seamless Experience,
              <span className="bg-gradient-to-r from-base-black to-primary bg-clip-text text-transparent">
                {" "}
                Anytime, Anywhere
              </span>
            </h1>

            <p className="body-regular-16 text-grey-medium max-w-lg">
              Your data stays synced across all devices, both mobile and
              desktop, allowing you to access your account anytime, anywhere. So
              no matter where you are, you'll always have a smooth and seamless
              experience.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-start gap-4"
          >
            <StoreButtons stores={storeLinks} direction="row" />
          </motion.div>

          {/* Feature Icons */}
          <motion.div variants={itemVariants} className="flex gap-6 pt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Mobile Ready</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Monitor className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Desktop Sync</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Real-time Data</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Visual Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Background Blur Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl transform scale-110"></div>

          {/* Mobile Device Mockup */}
          <motion.div
            animate={floatingAnimation}
            className="relative z-10 bg-black rounded-[2.5rem] p-2 shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500"
          >
            <div className="bg-gray-900 rounded-[2rem] p-6 space-y-4">
              {/* Status Bar */}
              <div className="flex justify-between items-center text-white text-sm">
                <span>9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                  <div className="w-1 h-2 bg-white rounded-sm"></div>
                </div>
              </div>

              {/* Stats Cards in Mobile */}
              <div className="space-y-3">
                <StatsCard
                  value="69,420"
                  label="Active Users"
                  trend="up"
                  delay={0.8}
                />
                <StatsCard
                  value="€125,890"
                  label="Revenue"
                  trend="up"
                  delay={1.0}
                />
                <StatsCard
                  value="94.2%"
                  label="Satisfaction"
                  trend="up"
                  delay={1.2}
                />
              </div>

              {/* Chart Area */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 h-24 flex items-end justify-between">
                {[40, 65, 45, 80, 55, 75, 90].map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                    className="bg-white/30 w-3 rounded-t"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Desktop Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -right-12 -bottom-8 z-20"
          >
            <motion.div className="w-80 shadow-xl border-0 bg-white/95 backdrop-blur">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Dashboard</h3>
                    <p className="text-sm text-gray-500">Real-time analytics</p>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-end h-16">
                    {[30, 50, 35, 70, 45, 65, 80, 55, 75].map(
                      (height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{
                            duration: 0.4,
                            delay: 1.8 + index * 0.05,
                          }}
                          className="bg-gradient-to-t from-blue-500 to-purple-600 w-4 rounded-t"
                        />
                      ),
                    )}
                  </div>
                </div>

                {/* User List */}
                <div className="space-y-2">
                  {["Alice Johnson", "Bob Smith", "Carol Davis"].map(
                    (name, index) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 2.2 + index * 0.1 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                        <span className="text-sm text-gray-700">{name}</span>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [-5, 5, -5],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-12 -left-8 bg-white/90 backdrop-blur rounded-xl p-3 shadow-lg"
          >
            <Users className="w-6 h-6 text-blue-600" />
          </motion.div>

          <motion.div
            animate={{
              y: [5, -5, 5],
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-4 left-8 bg-white/90 backdrop-blur rounded-xl p-3 shadow-lg"
          >
            <Calendar className="w-6 h-6 text-purple-600" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SeemlessExperience;
