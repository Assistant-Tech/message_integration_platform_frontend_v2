import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Package,
  Truck,
  MapPin,
} from "lucide-react";
import { Badge, Button } from "@/app/components/ui";

// Types
interface ProcessStep {
  id: number;
  title: string;
  status: "completed" | "current" | "pending";
  icon: React.ReactNode;
}

interface SlideImage {
  id: number;
  src: string;
  alt: string;
}

// Constants
const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: "Create your order",
    status: "completed",
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Dispatch Your Order",
    status: "current",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Track Your Order",
    status: "pending",
    icon: <MapPin className="w-5 h-5" />,
  },
];

const SLIDE_IMAGES: SlideImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    alt: "Person using laptop for online ordering",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop",
    alt: "Package being prepared for dispatch",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
    alt: "Tracking and delivery process",
  },
];

const AUTO_SLIDE_INTERVAL = 4000;

// Hooks
const useAutoSlide = (
  totalSlides: number,
  interval: number = AUTO_SLIDE_INTERVAL,
) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [totalSlides, interval, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    pauseAutoSlide: () => setIsPaused(true),
    resumeAutoSlide: () => setIsPaused(false),
  };
};

// Components
const ProcessStepIndicator: React.FC<{
  step: ProcessStep;
  isActive: boolean;
}> = ({ step, isActive }) => {
  const getStepStyles = () => {
    switch (step.status) {
      case "completed":
        return "bg-emerald-500 text-white border-emerald-500";
      case "current":
        return "bg-blue-500 text-white border-blue-500";
      default:
        return "bg-gray-200 text-gray-400 border-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center space-y-2"
    >
      <div
        className={`
        w-12 h-12 rounded-full border-2 flex items-center justify-center
        transition-all duration-300 ${getStepStyles()}
      `}
      >
        {step.icon}
      </div>
      <span
        className={`
        text-sm font-medium transition-colors duration-300
        ${isActive ? "text-blue-600" : "text-gray-600"}
      `}
      >
        {step.title}
      </span>
    </motion.div>
  );
};

const ProcessSteps: React.FC = () => {
  const { currentSlide } = useAutoSlide(PROCESS_STEPS.length);

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {PROCESS_STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            <ProcessStepIndicator
              step={step}
              isActive={currentSlide === index}
            />
            {index < PROCESS_STEPS.length - 1 && (
              <div className="flex-1 mx-4">
                <div className="h-0.5 bg-gray-300 relative overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500"
                    initial={{ width: "0%" }}
                    animate={{
                      width: currentSlide > index ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ImageSlider: React.FC = () => {
  const {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    pauseAutoSlide,
    resumeAutoSlide,
  } = useAutoSlide(SLIDE_IMAGES.length);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={pauseAutoSlide}
      onMouseLeave={resumeAutoSlide}
    >
      <div className="relative h-80 overflow-hidden rounded-2xl bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={SLIDE_IMAGES[currentSlide]?.src}
            alt={SLIDE_IMAGES[currentSlide]?.alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {SLIDE_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CTASection: React.FC = () => {
  return (
    <div>
      {/* Main Content */}
      <div className="text-center lg:text-left">
        <div className="pb-4">
          <Badge title="Manage Your Orders" />
        </div>

        <div className="space-y-4">
          <h1 className="h2-bold-40 text-grey">
            Track and Manage Your
            <br />
            <span className="text-gray-700">Orders</span>
          </h1>

          <p className="h4-regular-24 text-grey-medium w-2xl mx-auto">
            Track and manage all your orders with the help of our Order
            Management features. View stats and insights for all your orders
            easily.
          </p>
        </div>
        <div className="flex gap-4 justify-center lg:justify-start items-center lg:items-start pt-6 ">
          <Button label="Start Free Trial" variant="primary" />
          <Button label="Book a Demo" variant="outlined" />
        </div>
      </div>
    </div>
  );
};

// Main Component
const OrderManagement: React.FC = () => {
  return (
    <div className="bg-whitepx-4  pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-48 items-center">
          {/* Left Section - Process Steps and Image Slider */}
          <div className="space-y-8 order-2 lg:order-1">
            <ProcessSteps />
            <ImageSlider />
          </div>

          {/* Right Section - CTA Content */}
          <div className="order-1 lg:order-2">
            <CTASection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
