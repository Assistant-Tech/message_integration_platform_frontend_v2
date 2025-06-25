import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/common/Tooltip";
import logo from "@/app/assets/icons/logo-white.svg";
import { sidebarItems } from "@/app/utils/admin/Sidebar";

const CollapsibleSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex h-screen bg-grey-light">
        <aside
          className={`bg-primary text-white transition-all duration-300 ease-in-out ${
            isCollapsed ? "w-20" : "w-64"
          } flex flex-col`}
        >
          {/* Header */}
          <div className="p-4 border-primary-dark relative">
            {isCollapsed ? (
              <div className="flex justify-center px-2">
                <img src={logo} alt="Logo" className="w-10 h-10" />
              </div>
            ) : (
              <div className="flex items-center space-x-3 px-4">
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <span className="h5-bold-16 text-white">Assistant Tech</span>
              </div>
            )}

            {/* Toggle button */}
            <div className="absolute top-5 -right-5 w-1/2 flex justify-end">
              <button
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="bg-base-white rounded-full text-primary p-2 cursor-pointer"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.href);
                const isOpen = openSubmenu === item.label;

                const linkContent = (
                  <div
                    className={`flex items-center p-3 rounded-lg transition-colors group relative cursor-pointer ${
                      isActive
                        ? "bg-primary-dark text-white"
                        : "text-primary-light hover:bg-primary-dark hover:text-white"
                    }`}
                    onClick={
                      item.hasSubmenu && !isCollapsed
                        ? () => toggleSubmenu(item.label)
                        : undefined
                    }
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="body-bold-16 ml-3">{item.label}</span>
                        {item.hasSubmenu && (
                          <ChevronRight
                            className={`w-4 h-4 ml-auto transition-transform ${
                              isOpen ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </>
                    )}
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
                    ) : item.hasSubmenu && item.submenu ? (
                      <>
                        <div>{linkContent}</div>
                        {isOpen && (
                          <ul className="pl-10 mt-1 space-y-1">
                            {item.submenu.map((sub, i) => (
                              <li key={i}>
                                <Link
                                  to={sub.href}
                                  className={`block py-1.5 px-2 rounded-md text-sm ${
                                    location.pathname === sub.href
                                      ? "bg-primary-dark text-white"
                                      : "text-primary-light hover:bg-primary-dark hover:text-white"
                                  }`}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link to={item.href}>{linkContent}</Link>
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
