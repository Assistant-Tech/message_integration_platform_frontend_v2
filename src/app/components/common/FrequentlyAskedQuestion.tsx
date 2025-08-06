import Section from "@/app/components/layout/Section";
import { Accordian } from "@/app/components/ui";
import { faqData } from "@/app/utils/utils";

const FrequentlyAskedQuestion = () => {
  return (
    <Section>
      <div className="py-20 px-2" id="faq">
        <div className="w-full">
          {/* Main Heading */}
          <div className="mb-12">
            <h2 className="h2-bold-40 text-grey mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            <Accordian items={faqData} defaultOpenId="item-1" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FrequentlyAskedQuestion;
