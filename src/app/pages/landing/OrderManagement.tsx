import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge, Button } from "@/app/components/ui";

const images = [
  "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920902/CRM1_vfsdiz.webp",
  "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920899/support_digede.webp",
  "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920902/CRM1_vfsdiz.webp",
];
const steps = ["Create your order", "Dispatch your order", "Track your order"];

const OrderManagement: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(activeIndex);
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="bg-white pt-20 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-28 items-center px-4 lg:px-0">
        {/* Left Section */}
        <div className="order-2 lg:order-1 w-full space-y-4 ">
          {/* Step Timeline */}
          <div className="flex justify-between items-center relative w-full">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              const isDone =
                index < activeIndex ||
                (activeIndex === 0 && prevIndex === steps.length - 1);

              return (
                <div
                  key={index}
                  className="flex flex-col items-center w-full relative"
                >
                  {/* Dot */}
                  <motion.div
                    animate={{
                      backgroundColor:
                        isDone || isActive ? "#1cb496" : "#e3e3e3",
                      scale: isActive ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 rounded-full z-10"
                  />

                  {/* Label */}
                  <motion.p
                    className={`mt-2 text-sm text-center font-medium ${
                      isActive ? "text-primary" : "text-grey-medium"
                    }`}
                  >
                    {step}
                  </motion.p>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-2 left-1/2 w-full h-0.5 bg-grey-light z-0 overflow-hidden">
                      <motion.div
                        key={`${activeIndex === 0 && prevIndex === steps.length - 1 ? "reset" : "progress"}-${index}`}
                        initial={{ width: 0 }}
                        animate={{
                          width: isDone ? "100%" : "0%",
                        }}
                        transition={{
                          duration:
                            activeIndex === 0 && prevIndex === steps.length - 1
                              ? 0
                              : 0.5,
                        }}
                        className="h-full bg-primary origin-left"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Image Gallery */}
          <div className="relative h-[550px] w-full flex justify-center items-center">
            {images.map((img, index) => {
              const position =
                (index - activeIndex + images.length) % images.length;

              let x = 0,
                scale = 0.9,
                zIndex = 10,
                opacity = 0.5;

              if (position === 0) {
                x = -160;
                scale = 0.9;
                zIndex = 5;
              } else if (position === 1) {
                x = 0;
                scale = 1;
                zIndex = 30;
                opacity = 1;
              } else if (position === 2) {
                x = 160;
                scale = 0.8;
                zIndex = 5;
              } else {
                return null;
              }

              return (
                <motion.div
                  key={index}
                  className="absolute w-[400px] h-[400px] rounded-xl overflow-hidden shadow-lg"
                  animate={{ x, scale, opacity, zIndex }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ zIndex }}
                >
                  {/* Image */}
                  <img
                    src={img}
                    alt={`Order Step ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />

                  {/* Overlay only if not active */}
                  {position !== 1 && (
                    <div className="absolute inset-0 bg-black/55 rounded-xl pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Section - CTA */}
        <div className="order-1 lg:order-2">
          <Badge title="MANAGE YOUR ORDERS" textStyle="body-italic-bold-16" />
          <motion.article className="w-full max-w-lg space-y-4">
            <h1 className="h2-bold-40 text-grey text-start pt-4">
              Track and Manage Your Orders
            </h1>
            <p className="h4-regular-24 text-grey-medium">
              Stay on top of your operations with our intuitive order management
              tools. Monitor, track, and streamline your order lifecycle
              effortlessly.
            </p>
            <div className="flex gap-4 pt-2 justify-center items-center lg:justify-start lg:items-start">
              <Button
                label="Start Free Trial"
                variant="primary"
                className="px-3 py-2"
              />
              <Button
                label="Book a Demo"
                variant="outlined"
                redirectTo="/demo"
                className="px-3 py-2"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
