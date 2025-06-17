import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import { Badge, Button } from "@/app/components/ui";
import crm from "@/app/assets/images/crm.webp";

const steps = ["Create your order", "Dispatch your order", "Track your order"];

const OrderManagement: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white pt-20">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-48 items-center">
        {/* Left Section - Image Slider with Timeline */}
        <figure className="space-y-8 order-2 lg:order-1 w-full relative max-w-lg">
          {/* Timeline Bar with Progress */}
          <div className="relative mb-6">
            <div className="flex justify-between items-center w-full">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-full relative"
                >
                  {/* Dot */}
                  <div
                    className={`w-4 h-4 rounded-full z-10 ${index <= activeStep ? "bg-blue-600" : "bg-gray-300"}`}
                  />
                  <p
                    className={`text-xs mt-2 text-center ${index === activeStep ? "text-blue-600 font-medium" : "text-gray-500"}`}
                  >
                    {step}
                  </p>
                  {/* Connecting line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-2 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                      <motion.div
                        initial={false}
                        animate={{
                          width: activeStep > index ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-blue-600 origin-left"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Swiper Slider with overlapping effect */}
          <div className="relative overflow-visible h-96">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={-180}
              slidesPerView={2.5}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              onSlideChange={(swiper) => setActiveStep(swiper.realIndex)}
              className="w-full h-full"
            >
              {[1, 2, 3].map((i) => (
                <SwiperSlide key={i}>
                  {({ isActive, isNext, isPrev }) => (
                    <div
                      className={`relative w-full h-96 transition-all duration-500 ${
                        isActive
                          ? "z-50 scale-100 opacity-100"
                          : isNext || isPrev
                            ? "z-20 scale-90 opacity-60"
                            : "z-10 scale-80 opacity-40"
                      }`}
                      style={{
                        transform: isActive
                          ? "translateX(0px) scale(1)"
                          : isNext
                            ? "translateX(-30px) scale(0.9)"
                            : isPrev
                              ? "translateX(30px) scale(0.9)"
                              : "scale(0.8)",
                      }}
                    >
                      <img
                        src={crm}
                        alt={`Order step ${i}`}
                        className="rounded-xl shadow-lg w-full h-full object-cover transition-all duration-500"
                      />
                      {/* Overlay for non-active slides */}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-xl bg-black opacity-20 transition-all duration-500 pointer-events-none" />
                      )}
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </figure>

        {/* Right Section - CTA */}
        <div className="order-1 lg:order-2">
          <Badge title="MANAGE YOUR ORDERS" textStyle="body-italic-bold-16" />
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
