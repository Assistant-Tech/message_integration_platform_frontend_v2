import React, { useState, useCallback, useEffect } from "react";
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
    return () => intervalId && clearInterval(intervalId);
  }, [autoScroll, autoScrollInterval, goToNext, total]);

  return (
    <section id="testimonials" className="bg-primary-light py-10 px-4 md:px-8 mb-8">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 items-start">
        {/* Header Section */}
        <div className="lg:w-1/2 w-full text-center lg:text-left space-y-4 pt-10">
          <Badge
            title="CLIENT TESTIMONIALS"
            bgColor="bg-primary"
            textColor="text-white"
            textStyle="body-italic-bold-16"
          />
          <h2 className="h2-bold-40 text-grey">Hear From Our Clients</h2>
          <p className="h4-regular-24 text-grey-medium max-w-md mx-auto lg:mx-0">
            Our clients speak for us. Their success stories are proof of the
            impact we deliver.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="lg:w-1/2 w-full flex flex-col gap-6">
          <div className="relative bg-white rounded-3xl p-4 sm:px-6 sm:py-4 lg:py-4 lg:px-8 shadow-lg transition-all duration-200">
            {/* Quote Icon */}
            <div className="flex justify-center mb-4">
              <svg
                width="48"
                height="48"
                viewBox="0 0 49 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-primary-light"
              >
                <path
                  d="M21.044 8.1605C21.2528 8.49458 21.3938 8.86652 21.4588 9.25507C21.5239 9.64363 21.5118 10.0412 21.4232 10.4251C21.3346 10.809 21.1713 11.1716 20.9425 11.4924C20.7138 11.8131 20.4241 12.0857 20.09 12.2945C16.4387 14.5688 13.538 17.868 11.75 21.7805C13.5557 21.6295 15.3649 22.027 16.9409 22.9211C18.5169 23.8152 19.7863 25.1642 20.5831 26.7915C21.3799 28.4189 21.6669 30.2489 21.4067 32.0421C21.1464 33.8352 20.3509 35.5081 19.1243 36.8417C17.8977 38.1754 16.2971 39.1078 14.5319 39.5168C12.7667 39.9259 10.9191 39.7926 9.23093 39.1345C7.54272 38.4763 6.09249 37.3239 5.06997 35.828C4.04745 34.3322 3.50026 32.5625 3.5 30.7505V30.6695C3.50326 30.4373 3.51327 30.2052 3.53 29.9735C3.557 29.5235 3.611 28.8935 3.716 28.1195C3.926 26.5805 4.337 24.4595 5.168 22.0775C6.824 17.3075 10.178 11.4125 16.91 7.2065C17.2441 6.99769 17.616 6.85674 18.0046 6.79168C18.3931 6.72662 18.7907 6.73873 19.1746 6.82731C19.5585 6.9159 19.9211 7.07923 20.2419 7.30798C20.5626 7.53673 20.8352 7.82641 21.044 8.1605Z"
                  fill="#E4F7F3"
                />
              </svg>
            </div>

            {/* Testimonial Text */}
            <p className="h4-semi-bold-24 text-grey-medium text-center py-4">
              {current?.content}
            </p>

            {/* Author Info */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
              <div className="flex items-center gap-4">
                <img
                  src={current?.author.avatar}
                  alt={current?.author.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="body-bold-16 text-grey">
                    {current?.author.name}
                  </span>
                  <span className="text-grey-medium h5-regular-16">
                    {current?.author.role}
                  </span>
                </div>
              </div>

              <figure className="py-2">
                <img
                  src="https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920899/testimonial_hsebxv.webp"
                  alt={current?.author.name}
                  className="rounded-lg object-contain"
                  width={115}
                  height={20}
                />
              </figure>
            </div>
          </div>

          {/* Dots Navigation */}
          {showDots && total > 1 && (
            <div className="flex justify-center gap-3 mt-6">
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
