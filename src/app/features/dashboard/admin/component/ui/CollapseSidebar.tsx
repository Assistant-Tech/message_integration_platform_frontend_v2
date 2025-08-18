import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/common/Tooltip";
import { sidebarItems } from "@/app/utils/admin/Sidebar";
import { Logo } from "@/app/components/ui";

const CollapsibleSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const location = useLocation();

  const toggleMenu = (label: string) => {
    setExpandedMenu((prev) => (prev === label ? null : label));
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex h-screen bg-grey-light">
        <aside
          className={`bg-primary text-white transition-all duration-300 ease-in-out ${
            isCollapsed ? "w-20" : "w-64"
          } flex flex-col`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-primary-dark relative">
            <div className="flex items-center justify-center px-2 space-x-3">
              <Logo variant="white" />
            </div>

            {/* Collapse Toggle */}
            <div className="absolute top-5 -right-5">
              <button
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="bg-base-white rounded-full text-primary p-2"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.href ||
                  location.pathname.startsWith(item.href + "/");

                const isExpanded = expandedMenu === item.label;

                const linkContent = (
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors group cursor-pointer ${
                      isActive
                        ? "bg-primary-dark text-white"
                        : "text-primary-light hover:bg-primary-dark hover:text-white"
                    }`}
                    onClick={() => {
                      if (item.hasSubmenu) {
                        toggleMenu(item.label);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5" />
                      {!isCollapsed && (
                        <span className="ml-3 body-bold-16">{item.label}</span>
                      )}
                    </div>
                    {!isCollapsed &&
                      item.hasSubmenu &&
                      (isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                );

                return (
                  <li key={index}>
                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link to={item.href}>{linkContent}</Link>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="text-white bg-grey"
                        >
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <>
                        {item.hasSubmenu ? (
                          <div>{linkContent}</div>
                        ) : (
                          <Link to={item.href}>{linkContent}</Link>
                        )}

                        {/* Submenu */}
                        {item.hasSubmenu && item.submenu && isExpanded && (
                          <ul className="pl-10 mt-1 space-y-1">
                            {item.submenu.map((sub, subIndex) => {
                              const subActive = location.pathname === sub.href;
                              return (
                                <li key={subIndex}>
                                  <Link
                                    to={sub.href}
                                    className={`block py-1.5 px-2 rounded-md body-bold-16 ${
                                      subActive
                                        ? "text-white"
                                        : "text-grey-light hover:text-white"
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>
    </TooltipProvider>
  );
};

export default CollapsibleSidebar;
