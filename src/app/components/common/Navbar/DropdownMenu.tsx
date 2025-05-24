import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import testImage from "@/app/assets/images/navbar-image-test.png";
import { Button } from "@/app/components/ui";

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: React.ElementType;
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
          /*  sits directly below the navbar and spans the viewport */
          className="absolute top-full left-0 right-0 mt-2 z-50"
        >
          {/*  inner wrapper shares the navbar’s 1600-px grid  */}
          <div className="mx-auto max-w-[1600px] bg-white rounded-lg shadow-lg ring-opacity-5 overflow-hidden">
            <div className="flex">
              {/* ---------- left column ---------- */}
              <div className="p-4 flex-1">
                <article className="flex flex-col items-start py-6">
                  <h1 className="h4-bold-24 text-base-black">{items.name}</h1>
                  <p className="body-regular-16 text-base-black">
                    Vestibulum tempus imperdiet sem ac porttitor. Vivamus
                    pulvinar commodo orci, suscipit porttitor velit elementum
                    non.
                  </p>
                </article>

                <div className="grid grid-cols-2 gap-y-6 py-6">
                  {items.dropdown?.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex gap-6 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center p-2">
                        <div className="w-10 h-10 p-2 bg-primary-light flex justify-center items-center mr-3 rounded-lg">
                          {item.icon && (
                            <item.icon className="h-6 w-6 text-primary group-hover:text-primary transition-colors" />
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
              <div className="bg-primary-light w-[22rem] m-2 rounded-lg flex-shrink-0">
                <figure className="p-8">
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
                      pulvinar commodo orci, suscipit porttitor velit elementum
                      non.
                    </p>
                  </div>
                </figure>
              </div>
            </div>

            {/* ---------- footer strip ---------- */}
            <div className="bg-primary-light body-regular-16 text-grey px-8 py-4 flex justify-between items-center">
              <div className="flex gap-8">
                <span>Terms&nbsp;and&nbsp;Conditions</span>
                <span>Help&nbsp;Center</span>
              </div>
              <Button label="Book a demo" variant="secondary" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;
