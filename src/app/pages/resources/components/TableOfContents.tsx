import React from "react";
import { motion } from "framer-motion";
import { TableOfContentsProps } from "@/app/utils/resource/utils";

const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  activeSection = "",
  onSectionClick,
}) => {
  const handleSectionClick = (id: string) => {
    if (onSectionClick) {
      onSectionClick(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 sticky top-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleSectionClick(item.id)}
            className={`
              block w-full text-left px-3 py-2 rounded-md text-sm transition-colors
              ${(item.level || 1) === 2 ? "ml-4" : ""}
              ${(item.level || 1) === 3 ? "ml-8" : ""}
              ${
                activeSection === item.id
                  ? "bg-primary-light text-primary"
                  : "text-grey-medium hover:text-primary hover:bg-primary-light cursor-pointer"
              }
            `}
          >
            {item.title}
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );
};

export default TableOfContents;
