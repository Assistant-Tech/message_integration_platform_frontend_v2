import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge, Button } from "@/app/components/ui";
import crm from "@/app/assets/images/crm.webp";

// You can replace these with actual different images
const images = [crm, crm, crm];
const steps = ["Create your order", "Dispatch your order", "Track your order"];

const OrderManagement: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white pt-20 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-72 items-center">
        {/* Left Section - Image Slider and Timeline */}
        <div className="order-2 lg:order-1 w-full space-y-8 relative">
          {/* Timeline */}
          <div className="flex justify-between items-center w-full mb-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-full relative"
              >
                <div
                  className={`w-4 h-4 rounded-full z-10 ${
                    index <= activeIndex ? "bg-primary" : "bg-grey-light"
                  }`}
                />
                <p
                  className={`h5-bold-16 mt-2 text-center ${
                    index === activeIndex
                      ? "text-primary font-medium"
                      : "text-grey-light"
                  }`}
                >
                  {step}
                </p>
                {index < steps.length - 1 && (
                  <div className="absolute top-2 left-1/2 w-full h-0.5 bg-grey-light z-0">
                    <motion.div
                      initial={false}
                      animate={{
                        width: activeIndex > index ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-primary origin-left"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Image Gallery - Overlapping Layout */}
          <div className="relative h-[450px] w-full flex justify-start items-center pl-8">
            {images.map((img, index) => {
              // Calculate position based on active index
              const position =
                (index - activeIndex + images.length) % images.length;
              let translateX = 0;
              let zIndex = 10;
              let scale = 0.9;
              let opacity = 0.6;

              if (position === 0) {
                // Active image - front and left
                translateX = 0;
                zIndex = 30;
                scale = 1;
                opacity = 1;
              } else if (position === 1) {
                // Next image - middle
                translateX = 120; // increased from 80
                zIndex = 20;
                scale = 0.9;
                opacity = 0.7;
              } else if (position === 2) {
                // Third image - right side
                translateX = 200; // increased from 140
                zIndex = 10;
                scale = 0.8;
                opacity = 0.5;
              }

              return (
                <motion.div
                  key={index}
                  className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg bg-white"
                  animate={{
                    x: translateX,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  style={{ zIndex }}
                >
                  <img
                    src={img}
                    alt={`Step ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Section - CTA */}
        <div className="order-1 lg:order-2 w-full">
          <Badge title="MANAGE YOUR ORDERS" />
          <motion.article className="w-full max-w-lg space-y-4">
            <h1 className="h2-bold-40 text-grey text-start pt-4">
              Track and Manage Your Orders
            </h1>
            <p className="h4-regular-24 text-grey-medium">
              Track and manage all your orders with the help of our Order
              Management features. View stats and insights for all your orders
              easily.
            </p>
            <div className="flex justify-start items-start gap-4">
              <Button label="Start Free Trial" variant="primary" />
              <Button
                label="Book a demo"
                variant="outlined"
                redirectTo="/demo"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
