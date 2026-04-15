import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import {
  LOGO_FAB_ICON_URL,
  LOGO_NORMAL_URL,
  LOGO_WHITE_URL,
} from "@/app/constants/image-cloudinary";

interface LogoProps {
  className?: string;
  /** Show the compact icon-only version (used when sidebar is collapsed) */
  collapsed?: boolean;
  variant?: "default" | "white";
  isDashboard?: boolean;
  tenantSlug?: string;
  requiresOnboarding?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  collapsed = false,
  variant = "default",
  isDashboard = false,
  tenantSlug,
  requiresOnboarding,
}) => {
  const navigate = useNavigate();

  const getDashboardRoute = () => {
    if (requiresOnboarding) return "/onboardingform";
    return `/app/${tenantSlug}/admin/dashboard`;
  };

  const handleClick = () => {
    if (isDashboard) {
      navigate(getDashboardRoute());
    } else {
      navigate(APP_ROUTES.PUBLIC.HOME);
    }
  };

  if (collapsed) {
    return (
      <div
        onClick={handleClick}
        className={`flex items-center justify-center cursor-pointer ${className}`}
      >
        <img src={LOGO_FAB_ICON_URL} className="w-6 h-6" alt="ChatBlix Logo" />
      </div>
    );
  }

  const logoSrc = variant === "white" ? LOGO_WHITE_URL : LOGO_NORMAL_URL;

  return (
    <div
      onClick={handleClick}
      className={`flex items-center space-x-2 cursor-pointer ${className}`}
    >
      <figure className="flex justify-center items-center gap-2">
        <img src={logoSrc} className="w-36 md:w-42" alt="ChatBlix Logo" />
      </figure>
    </div>
  );
};

export default Logo;
