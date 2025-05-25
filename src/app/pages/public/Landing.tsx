// import { TrailBanner } from "@/app/components/common";
import {
  // About,
  BuiltAssistant,
  ChatBot,
  // Contact,
  GetStarted,
  Hero,
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
    <div className="min-h-screen px-4">
      <Theme>
        {/* <TrailBanner /> */}

        {/* Implemented */}
        <Hero />
        <MainFeature />
        <ChatBot />
        <UnifiedMessageBox />
        <GetStarted />
        <ScaleBusiness />
        <BuiltAssistant />
        <Testimonials />
        <FAQ />

        {/* Left */}
        {/* <Contact />
        <About /> */}
      </Theme>
    </div>
  );
};

export default Landing;
