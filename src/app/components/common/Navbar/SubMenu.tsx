import { motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import { NavigationItem } from "@/app/utils/utils";

interface SubMenuProps {
  item: NavigationItem;
  onBack: () => void;
  onClose: () => void;
  onItemClick: (href: string) => void;
}

const SubMenu: React.FC<SubMenuProps> = ({
  item,
  onBack,
  onClose,
  onItemClick,
}) => {
  const slideVariants = {
    enter: {
      x: "100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "-100%",
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col h-full absolute inset-0 bg-white"
    >
      {/* Header with Back Button */}
      <div className="flex items-center p-4 max-h-16">
        <button
          onClick={onBack}
          className="p-2 mr-2 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h3 className="body-bold-16 flex-1">{item.name}</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Description Section */}
      <div className="px-4">
        <h5 className="h5-bold-16 text-base-black pb-2">{item.name}</h5>
        <p className="label-regular-14 text-grey-medium">{item.description}</p>
      </div>

      {/* Submenu Items */}
      <ul className="flex flex-col pt-4 px-4">
        {item.dropdown?.map((subItem, index) => (
          <li key={index} onClick={() => onItemClick(subItem.href)}>
            <div className="flex items-start space-x-4 space-y-4">
              <div className="flex justify-start items-center pb-4">
                <figure className="w-14 h-14 p-2 bg-primary-light flex justify-center items-center mr-3 rounded-lg">
                  <subItem.icon
                    className="h-6 w-6 text-primary group-hover:text-primary transition-colors"
                    size={24}
                  />
                </figure>
                <div className="flex flex-col">
                  <h4 className="body-bold-16 text-grey pb-px">
                    {subItem.name}
                  </h4>
                  <p className="body-regular-16 text-grey-medium">
                    {subItem.description}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SubMenu;
