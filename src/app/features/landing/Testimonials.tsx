import React, { useState, useCallback, useEffect } from "react";
import { Quote } from "lucide-react";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { Badge } from "@/app/components/ui";
import { Testimonial, defaultTestimonials } from "@/app/utils/utils";

interface TestimonialsProps {
  testimonials?: Testimonial[];
  showNavigation?: boolean;
  showDots?: boolean;
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = defaultTestimonials,
  showDots = true,
  autoScroll = false,
  autoScrollInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[currentIndex];

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (autoScroll && total > 1) {
      intervalId = setInterval(() => {
        goToNext();
      }, autoScrollInterval);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoScroll, autoScrollInterval, goToNext, total]);

  return (
    <section className="min-w-full h-auto md:min-h-[300px] bg-primary-light my-10 px-4 md:px-2">
      <Box className="max-w-[1600px] mx-auto py-10">
        <Flex
          direction={{
            initial: "column",
            md: "column",
            lg: "row",
          }}
          align="center"
          justify="center"
          gap={{ initial: "8", lg: "8" }}
        >
          {/* Header Section */}
          <Box className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
            <Badge title="CLIENT TESTIMONIALS" bgColor="bg-primary" textColor="text-white"/>
            <Flex
              direction={{ initial: "column", md: "column", lg: "column" }}
              gap="4"
              align={{ initial: "center", lg: "start" }}
            >
              <h2 className="h2-bold-40 text-grey">Hear From Our Clients</h2>
              <p className="h4-regular-24 text-grey-medium max-w-md">
                Our clients speak for us. Their success stories are proof of the
                impact we deliver.
              </p>
            </Flex>
          </Box>

          {/* Testimonial Card */}
          <Box className="w-full lg:w-1/2">
            <Box className="relative bg-white rounded-3xl p-8 sm:p-10 lg:p-12 transition-all duration-500 ">
              {/* Centered Quote Icon */}
              <Flex justify="center" className="mb-4">
                {" "}
                {/* Added Flex for centering */}
                <Box>
                  <Quote className="w-16 h-16  text-primary-light" />
                </Box>
              </Flex>

              <Heading
                as="h1"
                className="h4-semi-bold-24 text-grey-medium text-center mb-8"
              >
                {current?.content}
              </Heading>

              <Flex align="center" gap="4" className="mb-6">
                <Box className="relative">
                  <img
                    src={current?.author.avatar}
                    alt={current?.author.name}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-emerald-100"
                  />
                  <Box className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-white" />
                </Box>
                <Box>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {current?.author.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {current?.author.role}
                  </p>
                </Box>
              </Flex>
            </Box>

            {/* Dots */}
            {showDots && total > 1 && (
              <Flex justify="center" gap="3" className="mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "bg-primary w-8"
                        : "bg-gray-300 hover:bg-gray-400 w-3"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </section>
  );
};

export default Testimonials;
