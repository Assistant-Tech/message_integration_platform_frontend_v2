import Section from "@/app/components/layout/Section";

import { Footer, FAQ, Navbar } from "@/app/components/common";
import { DemoComponent } from "@/app/components/common/BookADemo";
import { GetStarted, Pricing } from "@/app/pages/landing/";

const Demo = () => {
  return (
    <div>
      <Section>
        <Navbar />

        {/* Your demo page content */}
        <div className="py-8">
          {/* You can add other content here */}
          <div className="mt-14">
            <h1 className="h2-bold-40 text-start text-base-black mb-6">
              Book a Demo
            </h1>
          </div>

          {/* Demo form component - now embedded directly in the page */}
          <div>
            <DemoComponent />
          </div>

          {/* Pricing */}
          <div className="py-24">
            <Pricing />
          </div>

          {/* Get Started */}
          <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
            <GetStarted />
          </div>

          {/* FAQ Section */}
          <div>
            <FAQ variant="default" />
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default Demo;
