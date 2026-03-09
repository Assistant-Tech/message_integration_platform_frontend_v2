import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/common/Tooltip";
import { sidebarItems } from "@/app/utils/admin/sidebar.config";
import { CollapsedLogo, Logo } from "@/app/components/ui";
import { useCurrentUser } from "@/app/hooks/query/useAuthQuery";

const CollapsibleSidebar = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { data: user } = useCurrentUser();

  // const [isCollapsed, setIsCollapsed] = useState(false);
  const isCollapsed = true;
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setExpandedMenu((prev) => (prev === label ? null : label));
  };

  const filteredItems = sidebarItems.filter((item) =>
    item.roles?.includes(user?.roleType ?? ""),
  );

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex bg-grey-light h-full min-h-0">
        <aside
          className={`bg-primary text-white transition-all duration-300 ease-in-out ${
            isCollapsed ? "w-20" : "w-64"
          } flex flex-col h-full`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-primary-dark relative">
            <div className="flex items-center justify-center px-2 space-x-3 pt-2">
              {isCollapsed ? (
                <CollapsedLogo />
              ) : (
                <Logo variant="white" isDashboard />
              )}
            </div>

            {/* Collapse Toggle */}
            {/* <div className="absolute top-5 -right-5">
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
            </div> */}
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:bg-primary-dark">
            <ul className="space-y-2">
              {filteredItems.map((item, index) => {
                const Icon = item.icon;
                const finalHref = `/${slug}/admin/${item.href}`;
                const isActive = location.pathname.startsWith(finalHref);
                const isExpanded = expandedMenu === item.label;

                const linkContent = (
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors group cursor-pointer ${
                      isActive
                        ? "bg-primary-dark text-white"
                        : "text-white hover:bg-primary-dark hover:text-white"
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
                          <Link to={finalHref}>{linkContent}</Link>
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
                          <Link to={finalHref}>{linkContent}</Link>
                        )}

                        {item.hasSubmenu && item.submenu && isExpanded && (
                          <ul className="pl-10 mt-1 space-y-1">
                            {item.submenu
                              .filter((sub) => {
                                const allowedRoles = sub.roles ?? item.roles;
                                return allowedRoles?.includes(
                                  user?.roleType ?? "",
                                );
                              })
                              .map((sub, subIndex) => {
                                const subFinalHref = `/${slug}/admin/${sub.href}`;
                                const subActive =
                                  location.pathname === subFinalHref;
                                return (
                                  <li key={subIndex}>
                                    <Link
                                      to={subFinalHref}
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
