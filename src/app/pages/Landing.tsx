import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { useState, Suspense, lazy } from "react";

import {
  Footer,
  Navbar,
  PopupModal,
  TrialBanner,
} from "@/app/components/common";
import {
  BuiltAssistant,
  GetStarted,
  HeroSection,
  MainFeature,
  ScaleBusiness,
  Pricing,
  FAQ,
  OrderManagement,
} from "@/app/pages/landing/index";
import Section from "@/app/components/layout/Section";

// Lazy-load large components
const ChatBot = lazy(() => import("@/app/pages/landing/ChatBot"));
const Testimonials = lazy(() => import("@/app/pages/landing/Testimonials"));

const Landing = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const sections = [
    // Popup Modal
    { element: <PopupModal /> },
    // Hero Section
    { element: <HeroSection /> },
    // Main Feature
    { element: <MainFeature /> },
    // Chatbot with fallbacks
    {
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ChatBot />
        </Suspense>
      ),
    },
    // Get Started
    { element: <GetStarted />, useContainer: false },
    // Scale Your Business
    { element: <ScaleBusiness /> },
    // Built Assistant
    { element: <BuiltAssistant /> },
    //Order Mangement
    { element: <OrderManagement /> },
    //Testimonials
    {
      element: (
        <Suspense fallback={<div>Loading testimonials...</div>}>
          <Testimonials />
        </Suspense>
      ),
      useContainer: false,
    },
    // Pricing
    { element: <Pricing /> },
    // Faq
    { element: <FAQ /> },
    // Footer
    { element: <Footer />, useContainer: false },
  ];

  return (
    <div className="min-h-screen">
      <Theme>
        {/* Trial banner or Ads Type Section */}
        <TrialBanner onClose={() => setIsBannerVisible(false)} />
        {/* Navbar */}
        <Navbar offsetTop={isBannerVisible} />
        {sections.map(({ element, useContainer = true }, idx) => (
          <Section key={idx} useContainer={useContainer}>
            {element}
          </Section>
        ))}
      </Theme>
    </div>
  );
};

export default Landing;
