import { useState } from "react";
import { motion } from "framer-motion";
import { Input, Agreement } from "@/app/components/ui";
import { features } from "@/app/utils/product/utils";
import bulkmessaging from "@/app/assets/images/bulk-messaging.webp";

const stats = [
  { value: "95%", label: "Delivery Rate" },
  { value: "80%", label: "Time Saved" },
  { value: "24/7", label: "Automated Outreach" },
];

const BulkMessageHeader = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="relative overflow-hidden pb-20">
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 max-w-xl"
          >

            <h1 className="h2-bold-40 text-base-black leading-tight">
              Scale Your Outreach with
              <span className="text-primary block sm:inline sm:pl-2">
                Smart Bulk Messaging
              </span>
            </h1>

            <p className="body-regular-16 text-grey-medium">
              Reach thousands with a click. Automate personalized messages
              across SMS, WhatsApp, and Email – all from one dashboard. Faster,
              simpler, more effective communication.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
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
                Get started with smart campaigns today.
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
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4 cursor-pointer"
                >
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                  />
                  <h3 className="body-regular-16 text-primary">
                    {feature.title}
                  </h3>
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
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-grey-light/20 bg-white">
              <div className="aspect-[4/3]">
                <img
                  src={bulkmessaging}
                  alt="Bulk Messaging Preview"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BulkMessageHeader;
