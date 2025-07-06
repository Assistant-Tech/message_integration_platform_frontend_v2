import { Theme } from "@radix-ui/themes";
import { Suspense, lazy } from "react";

import {
  Footer,
  NewsLetterModalPopUp,
  AnnoucementBanner,
  Navbar,
  FAQ,
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

const ChatBot = lazy(() => import("@/app/pages/landing/ChatBot"));
const Testimonials = lazy(() => import("@/app/pages/landing/Testimonials"));

// const BANNER_HEIGHT = 68;

const LandingContent = () => {
  const { bannerVisible } = useBanner();
  const { width } = useWindowSize();

  const BANNER_HEIGHT = width < 768 ? 78 : 50;

  const sections = [
    { element: <NewsLetterModalPopUp /> },
    { element: <HeroSection /> },
    { element: <MainFeature /> },
    {
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ChatBot />
        </Suspense>
      ),
    },
    { element: <GetStarted />, useContainer: false },
    { element: <ScaleBusiness /> },
    { element: <BuiltAssistant /> },
    { element: <OrderManagement /> },
    {
      element: (
        <Suspense fallback={<div>Loading testimonials...</div>}>
          <Testimonials />
        </Suspense>
      ),
      useContainer: false,
    },
    { element: <Pricing /> },
    { element: <FAQ variant="landing" /> },
    { element: <Footer />, useContainer: false },
  ];

  return (
    <>
      {bannerVisible && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out"
          style={{ height: BANNER_HEIGHT }}
        >
          <AnnoucementBanner>
            <h1>
              🚀 Start your free trial today and enjoy 20% off the starter plan!
              Don't miss out on this limited time offer.{" "}
              <span className="underline cursor-pointer">Learn More</span>
            </h1>
          </AnnoucementBanner>
        </div>
      )}

      <Navbar offsetTop={bannerVisible ? BANNER_HEIGHT : 0} />

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
      </Theme>
    </div>
  );
};

export default Landing;
