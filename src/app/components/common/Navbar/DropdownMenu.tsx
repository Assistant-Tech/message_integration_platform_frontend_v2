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
          className="absolute top-full flex justify-center left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-[1680px] bg-white rounded-lg shadow-lg ring-opacity-5 overflow-hidden z-50"
        >
          <div className="flex flex-col justify-center items-center w-screen">
            <div className="flex">
              {/* left side image & text */}
              <div className="p-4 bg-white">
                {/* Typography */}
                <article className="flex flex-col items-start justify-start py-6">
                  <h1 className="h4-bold-24 text-base-black">{items.name}</h1>
                  <p className="body-regular-16 text-base-black">
                    Vestibulum tempus imperdiet sem ac porttitor. Vivamus
                    pulvinar commodo orci, suscipit porttitor velit elementum
                    non.
                  </p>
                </article>

                {/* middle Grid buttons to navigate */}
                <div className="grid grid-cols-2 gap-y-6 py-6">
                  {items.dropdown?.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex gap-6 rounded-lg transition-colors group"
                    >
                      <div className="flex gap-2 items-center justify-center p-2">
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

              {/* right side iamge && typograpghy */}
              <div className="bg-primary-light w-lg m-2 rounded-lg">
                <figure className="p-8">
                  <img
                    src={testImage}
                    alt="dropdown image"
                    className=" rounded-lg"
                  />
                  <div className="pt-3 text-start">
                    <h1 className="body-bopld-16 text-base-black">
                      Lorem Ipusm
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

            {/* bottom side help type */}
            <div className="bg-primary-light w-full body-regular-16 text-grey px-32 py-4 flex justify-between items-center">
              <article className="flex gap-8">
                <h1>Terms and Conditions </h1>
                <h1>Help Center </h1>
              </article>
              <Button label="Book a demo" variant="secondary" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default DropdownMenu;
