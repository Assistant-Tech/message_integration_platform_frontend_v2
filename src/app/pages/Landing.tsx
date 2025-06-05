import { Footer, Navbar } from "@/app/components/common";
import {
  BuiltAssistant,
  ChatBot,
  GetStarted,
  HeroSection,
  MainFeature,
  ScaleBusiness,
  Testimonials,
  UnifiedMessageBox,
  FAQ,
} from "@/app/features/landing/";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Theme>
        {/* <TrailBanner /> */}

        {/* Implemented */}
        <Navbar />

        <HeroSection />
        <MainFeature />
        <ChatBot />
        <UnifiedMessageBox />
        <GetStarted />
        <ScaleBusiness />
        <BuiltAssistant />
        <Testimonials />
        <FAQ />

        <Footer />

        {/* Left */}
        {/* <Contact />
        <About /> */}
      </Theme>
    </div>
  );
};

export default Landing;
