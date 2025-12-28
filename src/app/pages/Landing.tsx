import { Theme } from "@radix-ui/themes";
import { Suspense, lazy, memo } from "react";

import {
  Footer,
  NewsLetterModalPopUp,
  Navbar,
  FAQ,
  AnnouncementBanner,
} from "@/app/components/common";
import {
  BuiltAssistant,
  GetStarted,
  HeroSection,
  MainFeature,
  ScaleBusiness,
  Pricing,
  OrderManagement,
} from "@/app/pages/landing/index";
import Section from "@/app/components/layout/Section";
import { useBanner } from "@/app/context/BannerContext";
import { useWindowSize } from "react-use";
import ChatToggleButton from "@/app/components/common/ChatToggleButton";

const MessageIntegrationFeatures = lazy(
  () => import("@/app/components/common/Hero/MessageIntegrationFeatures"),
);

// Lazy load heavy components
const ChatBot = lazy(() => import("@/app/pages/landing/ChatBot"));
const Testimonials = lazy(() => import("@/app/pages/landing/Testimonials"));

// Memoized loading components for better performance
const LoadingSpinner = memo(() => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
));

const LoadingTestimonials = memo(() => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
));

const LandingContent = () => {
  const { isVisible } = useBanner();
  const { width } = useWindowSize();

  const BANNER_HEIGHT = width < 768 ? 78 : 50;

  const sections = [
    { element: <NewsLetterModalPopUp /> },
    { element: <HeroSection /> },
    { element: <MainFeature /> },
    {
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ChatBot />
        </Suspense>
      ),
    },
    { element: <GetStarted />, useContainer: false },
    { element: <ScaleBusiness /> },
    { element: <BuiltAssistant /> },
    { element: <OrderManagement /> },
    { element: <MessageIntegrationFeatures />, useContainer: false },
    { element: <Pricing /> },
    {
      element: (
        <Suspense fallback={<LoadingTestimonials />}>
          <Testimonials />
        </Suspense>
      ),
      useContainer: false,
    },
    { element: <FAQ variant="landing" /> },
    { element: <Footer />, useContainer: false },
  ];

  return (
    <>
      {isVisible("landing_banner_dismissed") && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out"
          style={{ height: BANNER_HEIGHT }}
        >
          <AnnouncementBanner
            message="🚀 Start your free trial today and enjoy 20% off the starter plan! Don't miss out on this limited-time offer. Learn More"
            type="success"
            storageKey="landing_banner_dismissed"
          />
        </div>
      )}

      <Navbar
        offsetTop={isVisible("landing_banner_dismissed") ? BANNER_HEIGHT : 0}
      />

      {sections.map(({ element, useContainer = true }, idx) => (
        <Section key={idx} useContainer={useContainer}>
          {element}
        </Section>
      ))}
    </>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Theme>
        <LandingContent />
        <ChatToggleButton />
      </Theme>
    </div>
  );
};

export default Landing;
