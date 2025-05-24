// import { TrailBanner } from "@/app/components/common";
import {
  About,
  ChatBot,
  Contact,
  GetStarted,
  Hero,
  MainFeature,
  ScaleBusiness,
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

        {/* Left */}
        <Contact />
        <About />
      </Theme>
    </div>
  );
};

export default Landing;
