import Section from "@/app/components/layout/Section";
import { Accordian, Badge } from "@/app/components/ui";
import { Flex, Box } from "@radix-ui/themes";
import landing from "@/app/content/json/landing.json";

const FAQ = () => {
  const { faq } = landing;

  return (
    <Section>
      <div className="py-20" id="faq">
        <div className="bg-base-white rounded-2xl border-2 border-grey-light overflow-hidden">
          {/* Responsive Flex Container */}
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
                <Badge title={faq.badge} textStyle="body-italic-bold-16" />
                <h2 className="h2-bold-40 text-grey">{faq.title}</h2>
                <p className="text-grey-medium h4-regular-24 max-w-96 mx-auto lg:mx-0">
                  {faq.subtitle}
                </p>
              </div>
            </Box>

            {/* Right Section */}
            <Box
              width={{ initial: "100%", lg: "60%" }}
              className="px-6 sm:px-10 lg:pe-16 py-8"
            >
              <Accordian items={faq.items} defaultOpenId="item-1" />
            </Box>
          </Flex>
        </div>
      </div>
    </Section>
  );
};

export default FAQ;
