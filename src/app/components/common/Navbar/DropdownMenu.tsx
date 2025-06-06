import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import testImage from "@/app/assets/images/navbar-image-test.webp";
import { Button } from "@/app/components/ui";
import { ArrowUpRight } from "lucide-react";

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: string;
}

interface DropdownMenuProps {
  items: {
    name: string;
    dropdown?: DropdownItem[];
  };
  isVisible: boolean;
}

const DropdownMenu = ({ items, isVisible }: DropdownMenuProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 left-0 right-0 z-40 w-screen"
        >
          <div>
            <div className="w-full bg-white">
              <div className="max-w-[1600px] mx-auto">
                <div className="flex justify-center items-center">
                  {/* ---------- left column ---------- */}
                  <div className="flex flex-col">
                    <article className="flex flex-col items-start">
                      <h1 className="h4-bold-24 text-base-black">
                        {items.name}
                      </h1>
                      <p className="body-regular-16 text-base-black">
                        Vestibulum tempus imperdiet sem ac porttitor. Vivamus
                        pulvinar commodo orci, suscipit porttitor velit
                        elementum non.
                      </p>
                    </article>

                    <div className="min-w-5xl w-full grid grid-cols-2 gap-x-10 gap-y-6 py-6">
                      {items.dropdown?.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex gap-6 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center p-2">
                            <div className="w-14 h-14 p-2 bg-primary-light flex justify-center items-center mr-3 rounded-lg">
                              {item.icon && (
                                <img src={item.icon} className="h-8 w-8" />
                              )}
                            </div>
                            <div>
                              <div className="h4-bold-24 text-gray-900 group-hover:text-primary transition-colors">
                                {item.name}
                              </div>
                              {item.description && (
                                <div className="text-sm text-gray-500 mt-1">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* ---------- right column ---------- */}
                  <div className="bg-base-white w-3xl rounded-lg ">
                    <figure className="py-8 px-15">
                      <img
                        src={testImage}
                        alt="dropdown illustration"
                        className="rounded-lg"
                      />
                      <div className="pt-3 text-start">
                        <h1 className="body-bold-16 text-base-black">
                          Lorem Ipsum
                        </h1>
                        <p className="body-regular-16 text-gray-400">
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
                <div className="max-w-[1600px] mx-auto flex justify-between items-center">
                  <div className="flex gap-8">
                    <span>Terms&nbsp;and&nbsp;Conditions</span>
                    <span>Help&nbsp;Center</span>
                  </div>
                  <Button
                    label="Book a demo"
                    variant="secondary"
                    IconRight={<ArrowUpRight size={24} />}
                    className="flex flex-cols justify-center items-center"
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
