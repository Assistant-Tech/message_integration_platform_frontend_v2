import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import { Footer, Navbar, TrialBanner } from "@/app/components/common";
import {
  BuiltAssistant,
  ChatBot,
  GetStarted,
  HeroSection,
  MainFeature,
  ScaleBusiness,
  Testimonials,
  // UnifiedMessageBox,
  FAQ,
} from "@/app/features/landing/";
import { DemoDialog } from "@/app/features/auth";
import { Container } from "@/app/components/layout";
import { useState } from "react";

const Landing = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  return (
    <div className="min-h-screen">
      <Theme>
        <TrialBanner onClose={() => setIsBannerVisible(false)} />
        <Container>
          <DemoDialog />
        </Container>

        <Navbar offsetTop={isBannerVisible} />

        {/* Hero Section */}
        <Container>
          <HeroSection />
        </Container>

        {/* Meain Feature */}
        <Container>
          <MainFeature />
        </Container>

        {/* ChatBot */}
        <Container>
          <ChatBot />
        </Container>

        {/* <UnifiedMessageBox /> */}
        <GetStarted />

        {/* Scale Business */}
        <Container>
          <ScaleBusiness />
        </Container>

        {/* Build Assistant */}
        <Container>
          <BuiltAssistant />
        </Container>

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ */}
        <Container>
          <FAQ />
        </Container>

        <Footer />
      </Theme>
    </div>
  );
};

export default Landing;
