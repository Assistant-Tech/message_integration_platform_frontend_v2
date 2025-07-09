import { useState } from "react";
import { motion } from "framer-motion";
import { Input, Agreement } from "@/app/components/ui";
import { features } from "@/app/utils/product/utils";
import { FeatureBadge } from "@/app/pages/products/components";
import chatbot from "@/app/assets/video/chatbot.mp4";

const stats = [
  { value: "95%", label: "Customer Satisfaction" },
  { value: "50%", label: "Faster Response" },
  { value: "24/7", label: "Always Available" },
];

const ChatbotHeader = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="relative overflow-hidden pb-20">
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <FeatureBadge text="AI Chatbot Solutions" />

            <h1 className="h2-bold-40 text-base-black leading-tight">
              Transform Customer Service with
              <span className="text-primary block sm:inline sm:pl-2">
                Intelligent Chatbot Solutions
              </span>
            </h1>

            <p className="body-regular-16 text-grey-medium">
              Deploy AI-powered chatbots that understand context, provide
              instant responses, and enhance customer experience across all
              touchpoints. Automate support, boost engagement, and drive
              conversions 24/7.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-grey-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="space-y-4 pt-2">
              <p className="body-regular-16 text-grey-medium">
                Start automating your customer support today!
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  variant="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 sm:h-14 w-full focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="text-sm text-grey-medium">
                No credit card needed. Setup in minutes.
                <Agreement />
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 sm:gap-4 cursor-pointer"
                >
                  <img src={feature.icon} className="w-8 h-8" />
                  <div className="min-w-0">
                    <h3 className="body-regular-16 text-primary mb-1">
                      {feature.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-grey-light/20 bg-white">
              {/* 📹 Chatbot Video */}
              <div className="aspect-[4/3] bg-black">
                <video
                  src={chatbot}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotHeader;
