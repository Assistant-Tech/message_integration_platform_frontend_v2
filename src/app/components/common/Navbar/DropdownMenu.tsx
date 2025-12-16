import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/app/components/ui";
import { ArrowUpRight } from "lucide-react";
import { APP_ROUTES } from "@/app/constants/routes";
import { cn } from "@/app/utils/cn";
// import { useBanner } from "@/app/context/BannerContext";

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: string;
}

interface DropdownMenuProps {
  items: {
    name: string;
    dropdown: DropdownItem[];
  };
  isVisible: boolean;
}

const DropdownMenu = ({ items, isVisible }: DropdownMenuProps) => {
  // const { bannerVisible } = useBanner();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed left-0 right-0 z-40 w-screen",
            // bannerVisible ? "top-32" : "top-20",
          )}
        >
          <div>
            <div className="w-full bg-white">
              {/* Center and constrain max width, add responsive horizontal padding */}
              <div className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-8 md:gap-12">
                  {/* ---------- left column ---------- */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <article className="flex flex-col items-start">
                      <Link to={APP_ROUTES.PUBLIC.SLUG(items.name)}>
                        <h1 className="h4-bold-24 text-primary">
                          {items.name}
                        </h1>
                      </Link>

                      <p className="body-regular-16 text-base-black max-w-prose mt-2">
                        Vestibulum tempus imperdiet sem ac porttitor. Vivamus
                        pulvinar commodo orci, suscipit porttitor velit
                        elementum non.
                      </p>
                    </article>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 py-6">
                      {items.dropdown?.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex gap-4 rounded-lg transition-colors group"
                        >
                          <div className="w-14 h-14 p-2 bg-primary-light flex justify-center items-center rounded-lg flex-shrink-0">
                            {item.icon && (
                              <img
                                src={item.icon}
                                alt={`${item.name} icon`}
                                className="h-8 w-8"
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="h4-bold-24 text-grey group-hover:text-primary transition-colors truncate">
                              {item.name}
                            </div>
                            {item.description && (
                              <div className="text-sm text-grey-medium mt-1 line-clamp-2">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* ---------- right column ---------- */}
                  <div className="bg-base-white w-full md:w-[480px] rounded-lg flex-shrink-0">
                    <figure className="py-6 px-6 sm:py-8 sm:px-10">
                      <img
                        src={
                          "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753878938/navbar-image-test_pynn86.webp"
                        }
                        alt="dropdown illustration"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                      <div className="pt-3 text-start">
                        <h1 className="body-bold-16 text-base-black">
                          Lorem Ipsum
                        </h1>
                        <p className="body-regular-16 text-grey-medium">
                          Vestibulum tempus imperdiet sem ac porttitor. Vivamus
                          pulvinar commodo orci, suscipit porttitor velit
                          elementum non.
                        </p>
                      </div>
                    </figure>
                  </div>
                </div>
              </div>

              {/* Bottom Stripe */}
              <div className="bg-primary-light body-regular-16 text-grey py-4">
                <div className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex justify-between items-center">
                  <div className="flex gap-8 text-white cursor-pointer">
                    <span>Terms&nbsp;and&nbsp;Conditions</span>
                    <span>Help&nbsp;Center</span>
                  </div>
                  <Button
                    label="Book a demo"
                    variant="secondary"
                    IconRight={<ArrowUpRight size={24} />}
                    className="flex justify-center items-center"
                    redirectTo="/demo"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;
