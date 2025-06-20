import React, { useState, useCallback, useEffect } from "react";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { Badge } from "@/app/components/ui";
import { Testimonial, defaultTestimonials } from "@/app/utils/utils";
import testimonial from "@/app/assets/images/testimonial.webp";

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
    <section
      className="min-w-full max-h-2xl md:min-h-[300px] bg-primary-light my-20 px-4 md:px-2"
      id="testimonials"
    >
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
            <Badge
              title="CLIENT TESTIMONIALS"
              bgColor="bg-primary"
              textColor="text-white"
            />
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
            <Box className="relative bg-white rounded-3xl p-2 sm:p-4 lg:p-6 transition-all duration-200">
              {/* Centered Quote Icon */}
              <Flex justify="center">
                {/* Added Flex for centering */}
                <Box className="w-16 h-16 text-primary-light">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 49 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.044 8.1605C21.2528 8.49458 21.3938 8.86652 21.4588 9.25507C21.5239 9.64363 21.5118 10.0412 21.4232 10.4251C21.3346 10.809 21.1713 11.1716 20.9425 11.4924C20.7138 11.8131 20.4241 12.0857 20.09 12.2945C16.4387 14.5688 13.538 17.868 11.75 21.7805C13.5557 21.6295 15.3649 22.027 16.9409 22.9211C18.5169 23.8152 19.7863 25.1642 20.5831 26.7915C21.3799 28.4189 21.6669 30.2489 21.4067 32.0421C21.1464 33.8352 20.3509 35.5081 19.1243 36.8417C17.8977 38.1754 16.2971 39.1078 14.5319 39.5168C12.7667 39.9259 10.9191 39.7926 9.23093 39.1345C7.54272 38.4763 6.09249 37.3239 5.06997 35.828C4.04745 34.3322 3.50026 32.5625 3.5 30.7505V30.6695C3.50326 30.4373 3.51327 30.2052 3.53 29.9735C3.557 29.5235 3.611 28.8935 3.716 28.1195C3.926 26.5805 4.337 24.4595 5.168 22.0775C6.824 17.3075 10.178 11.4125 16.91 7.2065C17.2441 6.99769 17.616 6.85674 18.0046 6.79168C18.3931 6.72662 18.7907 6.73873 19.1746 6.82731C19.5585 6.9159 19.9211 7.07923 20.2419 7.30798C20.5626 7.53673 20.8352 7.82641 21.044 8.1605ZM42.044 8.1605C42.2528 8.49458 42.3938 8.86652 42.4588 9.25507C42.5239 9.64363 42.5118 10.0412 42.4232 10.4251C42.3346 10.809 42.1713 11.1716 41.9425 11.4924C41.7138 11.8131 41.4241 12.0857 41.09 12.2945C37.4387 14.5688 34.538 17.868 32.75 21.7805C34.5557 21.6295 36.3649 22.027 37.9409 22.9211C39.5169 23.8152 40.7863 25.1642 41.5831 26.7915C42.3799 28.4189 42.6669 30.2489 42.4067 32.0421C42.1464 33.8352 41.3509 35.5081 40.1243 36.8417C38.8977 38.1754 37.2971 39.1078 35.5319 39.5168C33.7667 39.9259 31.9191 39.7926 30.2309 39.1345C28.5427 38.4763 27.0925 37.3239 26.07 35.828C25.0474 34.3322 24.5003 32.5625 24.5 30.7505V30.6695C24.5033 30.4373 24.5133 30.2052 24.53 29.9735C24.557 29.5235 24.611 28.8935 24.716 28.1195C24.926 26.5805 25.337 24.4595 26.168 22.0775C27.824 17.3075 31.178 11.4125 37.91 7.2065C38.2441 6.99769 38.616 6.85674 39.0046 6.79168C39.3931 6.72662 39.7907 6.73873 40.1746 6.82731C40.5585 6.9159 40.9211 7.07923 41.2419 7.30798C41.5626 7.53673 41.8352 7.82641 42.044 8.1605Z"
                      fill="#E4F7F3"
                    />
                  </svg>
                </Box>
              </Flex>

              <Heading
                as="h1"
                className="h4-semi-bold-24 text-grey-medium text-center py-4"
              >
                {current?.content}
              </Heading>

              <Flex justify={"between"} align="center" className="max-h-auto">
                <Flex gap="4">
                  <Box className="relative">
                    <img
                      src={current?.author.avatar}
                      alt={current?.author.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  </Box>
                  <Flex direction={"column"} justify={"center"} align={"start"}>
                    <h4 className="body-bold-16 text-grey">
                      {current?.author.name}
                    </h4>
                    <p className="text-grey-medium h5-regular-16">
                      {current?.author.role}
                    </p>
                  </Flex>
                </Flex>
                <figure className="py-3">
                  <img
                    src={testimonial}
                    alt={current?.author.name}
                    className="rounded-lg object-fill"
                    width={115}
                    height={20}
                  />
                </figure>
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
