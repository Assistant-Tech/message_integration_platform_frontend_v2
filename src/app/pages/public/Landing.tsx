import {
  About,
  Contact,
  // Feature,
  Hero,
  MainFeature,
} from "@/app/features/landing/";

import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const Landing = () => {
  return (
    <div className="min-h-screen px-4 md:px-32">
      <Theme>
        <Hero />
        {/* <Feature /> */}
        <MainFeature />
        <Contact />
        <About />
      </Theme>
    </div>
  );
};

export default Landing;
