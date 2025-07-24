import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TableOfContents } from ".";
import { TableOfContentsItem } from "./TableOfContents";

interface StickyTOCLayoutProps {
  children: React.ReactNode;
  tocItems: TableOfContentsItem[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  title?: string;
  subtitle?: string;
  breadcrumb?: React.ReactNode;
}

const StickyTOCLayout: React.FC<StickyTOCLayoutProps> = ({
  children,
  tocItems,
  activeSection,
  onSectionClick,
  title,
  subtitle,
  breadcrumb,
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [tocElement, setTocElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!tocElement) return;
      const scrollTop = window.scrollY;
      const tocOriginalTop = 320;
      const navbarHeight = 80;
      setIsSticky(scrollTop > tocOriginalTop - navbarHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocElement]);

  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <div className="relative px-4 sm:px-6 lg:px-2">
          {breadcrumb && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              {breadcrumb}
            </motion.div>
          )}

          {(title || subtitle) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 lg:mb-12"
            >
              {title && (
                <h1 className="text-3xl lg:text-4xl font-bold text-grey mb-4">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-lg text-grey-medium max-w-3xl">{subtitle}</p>
              )}
            </motion.div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-16">
            {/* Sidebar - TOC */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="hidden lg:block" ref={setTocElement}>
                <div
                  className={`
                    transition-all duration-300 ease-in-out
                    ${isSticky ? "fixed top-20 w-80 z-40" : "sticky top-20"}
                  `}
                  style={
                    isSticky
                      ? {
                          maxHeight: "calc(100vh - 100px)",
                          overflowY: "auto",
                        }
                      : undefined
                  }
                >
                  <TableOfContents
                    items={tocItems}
                    activeSection={activeSection}
                    onSectionClick={onSectionClick}
                  />
                </div>
              </div>

              {/* Mobile TOC */}
              <div className="lg:hidden mb-6">
                <details className="bg-white rounded-lg border border-grey-light p-4">
                  <summary className="font-semibold text-grey cursor-pointer">
                    Table of Contents
                  </summary>
                  <nav className="mt-4 space-y-1">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onSectionClick(item.id)}
                        className={`
                          block w-full text-left px-3 py-2 rounded-md text-sm
                          transition-colors duration-200
                          ${(item.level || 1) === 2 ? "ml-4" : ""}
                          ${(item.level || 1) === 3 ? "ml-8" : ""}
                          ${
                            activeSection === item.id
                              ? "bg-primary-light text-primary font-medium"
                              : "text-grey-medium hover:text-primary hover:bg-primary-light"
                          }
                        `}
                      >
                        {item.title}
                      </button>
                    ))}
                  </nav>
                </details>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 transition-all duration-300 ease-in-out">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg border border-grey-light p-6 lg:p-8"
              >
                {children}
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyTOCLayout;
