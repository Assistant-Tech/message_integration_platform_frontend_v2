// import { TrailBanner } from "@/app/components/common";
import {
  About,
  BuiltAssistant,
  ChatBot,
  Contact,
  GetStarted,
  Hero,
  MainFeature,
  ScaleBusiness,
  Testimonials,
  UnifiedMessageBox,
} from "@/app/features/landing/";

import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const Landing = () => {
  return (
    <div className="min-h-screen">
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

        {/* Left */}
        <Contact />
        <About />
      </Theme>
    </div>
  );
};

export default Landing;
