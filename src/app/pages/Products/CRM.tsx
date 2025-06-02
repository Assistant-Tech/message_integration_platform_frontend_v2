import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Zap,
  Building2,
  Shield,
  Target,
  ArrowRight,
} from "lucide-react";
import { Breadcrumb, Button, Input } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";

const CRM: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: "CRM" },
  ];

  const handleGetStarted = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log("Starting trial with email:", email);
  };

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Round the Clock Reliability",
      description: "24/7 support and monitoring",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "All Essential Solutions",
      description: "Complete CRM toolkit in one platform",
    },
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "Better Support",
      color: "bg-orange-500",
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Built Smart",
      color: "bg-blue-500",
    },
    {
      icon: <Building2 className="w-8 h-8 text-emerald-500" />,
      title: "All Industries",
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white mt-24">
      <div>
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Breadcrumb items={breadcrumbItems} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Empowering Your Business with{" "}
                <span className="text-emerald-600">Assistant's</span> AI-Powered
                CRM Software
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Assistant Tech's CRM software helps you respond to your customer
                inquiries instantly and efficiently. It streamlines your
                company's workflow, helps with customer retention and
                simultaneously reduces marketing costs.
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-4">
              <p className="text-lg font-medium text-gray-900">
                Start your 14-days free trial today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <div className="flex-1">
                  <Input
                    placeholder="Enter your email"
                    variant="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button
                  label={isLoading ? "Loading..." : "Get Started"}
                  variant="primary"
                  onClick={handleGetStarted}
                  disabled={isLoading || !email}
                  IconRight={
                    !isLoading ? <ArrowRight className="w-4 h-4" /> : undefined
                  }
                  className="sm:w-auto whitespace-nowrap"
                />
              </div>

              <p className="text-sm text-gray-500">
                No credit card needed. By providing your contact information,
                you agree to{" "}
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 underline"
                >
                  Privacy Policy
                </a>{" "}
                of the company.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 p-2 bg-emerald-100 rounded-lg text-emerald-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Benefit Tags */}
              <div className="absolute top-4 right-4 space-y-2 z-10">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium shadow-lg",
                      benefit.color,
                    )}
                  >
                    {benefit.icon}
                    <span>{benefit.title}</span>
                  </motion.div>
                ))}
              </div>

              {/* Main CRM Visual */}
              <div className="p-8 text-white relative">
                {/* Network Visualization */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <radialGradient
                        id="nodeGradient"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#10b981"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="100%"
                          stopColor="#10b981"
                          stopOpacity="0.2"
                        />
                      </radialGradient>
                    </defs>
                    {/* Network nodes and connections */}
                    <g>
                      <line
                        x1="100"
                        y1="100"
                        x2="200"
                        y2="150"
                        stroke="#10b981"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      <line
                        x1="200"
                        y1="150"
                        x2="300"
                        y2="100"
                        stroke="#10b981"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      <line
                        x1="150"
                        y1="200"
                        x2="250"
                        y2="250"
                        stroke="#10b981"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="8"
                        fill="url(#nodeGradient)"
                      />
                      <circle
                        cx="200"
                        cy="150"
                        r="12"
                        fill="url(#nodeGradient)"
                      />
                      <circle
                        cx="300"
                        cy="100"
                        r="8"
                        fill="url(#nodeGradient)"
                      />
                      <circle
                        cx="150"
                        cy="200"
                        r="10"
                        fill="url(#nodeGradient)"
                      />
                      <circle
                        cx="250"
                        cy="250"
                        r="8"
                        fill="url(#nodeGradient)"
                      />
                    </g>
                  </svg>
                </div>

                {/* CRM Text */}
                <motion.div
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="relative z-10 text-center py-20"
                >
                  <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    CRM
                  </h2>
                  <div className="flex justify-center space-x-4 text-emerald-400">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6" />
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6" />
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Stats */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs opacity-60">
                  <span>Real-time Analytics</span>
                  <span>34300</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -left-4 w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Zap className="w-8 h-8 text-emerald-600" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Target className="w-10 h-10 text-blue-600" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CRM;
