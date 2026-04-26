import { Theme } from "@radix-ui/themes";

import {
  Footer,
  NewsLetterModalPopUp,
  Navbar,
  AnnouncementBanner,
} from "@/app/components/common";
import {
  Hero,
  IntegrationStrip,
  StoryPivot,
  ReplyFaster,
  AISupercharge,
  MobileApp,
  FAQSection,
} from "@/app/pages/landing";
import { useBanner } from "@/app/context/BannerContext";
import { useWindowSize } from "react-use";
import ChatToggleButton from "@/app/components/common/ChatToggleButton";

const LandingContent = () => {
  const { isVisible } = useBanner();
  const { width } = useWindowSize();

  const BANNER_HEIGHT = width < 768 ? 78 : 50;

  return (
    <>
      {isVisible("landing_banner_dismissed") && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out"
          style={{ height: BANNER_HEIGHT }}
        >
          <AnnouncementBanner
            message="🚀 Launching today — start your 14-day free trial. No credit card. Learn More"
            type="success"
            storageKey="landing_banner_dismissed"
          />
        </div>
      )}

      <NewsLetterModalPopUp />

      <Navbar
        offsetTop={isVisible("landing_banner_dismissed") ? BANNER_HEIGHT : 0}
      />

      <main className="relative overflow-x-hidden">
        <Hero />
        <IntegrationStrip />
        <StoryPivot />
        <ReplyFaster />
        <AISupercharge />
        <MobileApp />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
};

const Landing = () => (
  <div className="min-h-screen">
    <Theme>
      <LandingContent />
      <ChatToggleButton />
    </Theme>
  </div>
);

export default Landing;
