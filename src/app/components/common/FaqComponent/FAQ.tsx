import Section from "@/app/components/layout/Section";
import { Accordian, Badge } from "@/app/components/ui";
import { faqData } from "@/app/utils/utils";
import { Flex, Box } from "@radix-ui/themes";

interface FAQProps {
  variant?: "landing" | "default";
}

const FAQ: React.FC<FAQProps> = ({ variant = "landing" }) => {
  return (
    <Section>
      <div className="py-20 px-2" id="faq">
        <div
          className={`w-full ${
            variant === "landing"
              ? "bg-base-white rounded-2xl border-2 border-grey-light overflow-hidden"
              : ""
          }`}
        >
          {variant === "landing" ? (
            <Flex
              direction={{ initial: "column", lg: "row" }}
              justify="center"
              align="center"
              className="gap-y-10 lg:gap-y-0"
            >
              {/* Left Section */}
              <Box
                width={{ initial: "100%", lg: "50%" }}
                className="px-6 sm:px-10 lg:px-16"
              >
                <div className="space-y-4 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                  <Badge title="YOU ASK, WE ANSWER" />
                  <h2 className="h2-bold-40 text-grey">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-grey-medium h4-regular-24 max-w-96 mx-auto lg:mx-0">
                    Find answers to commonly asked questions in our platform
                  </p>
                </div>
              </Box>

              {/* Right Section */}
              <Box
                width={{ initial: "100%", lg: "60%" }}
                className="px-6 sm:px-10 lg:pe-16 py-8"
              >
                <Accordian items={faqData} defaultOpenId="item-1" />
              </Box>
            </Flex>
          ) : (
            <div className="space-y-4">
              {/* Heading */}
              <div className="mb-12 text-center lg:text-left">
                <h2 className="h2-bold-40 text-grey mb-4">
                  Frequently Asked Questions
                </h2>
              </div>

              {/* Accordion */}
              <Accordian items={faqData} defaultOpenId="item-1" />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default FAQ;
