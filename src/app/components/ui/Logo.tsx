import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import {
  LOGO_NORMAL_URL,
  LOGO_WHITE_URL,
} from "@/app/constants/image-cloudinary";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
  isDashboard?: boolean;
  tenantSlug?: string;
  requiresOnboarding?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "default",
  isDashboard = false,
  tenantSlug,
  requiresOnboarding,
}) => {
  const navigate = useNavigate();
  const logoSrc = variant === "white" ? LOGO_WHITE_URL : LOGO_NORMAL_URL;

  const getDashboardRoute = () => {
    if (requiresOnboarding) {
      return "/onboardingform";
    }
    return `/${tenantSlug}/admin/dashboard`;
  };

  const handleLogoClick = () => {
    if (isDashboard) {
      navigate(getDashboardRoute());
    } else {
      navigate(APP_ROUTES.PUBLIC.HOME);
    }
  };

  return (
    <div
      onClick={handleLogoClick}
      className={`flex items-center space-x-2 cursor-pointer ${className}`}
    >
      <figure className="flex justify-center items-center gap-2">
        <img
          src={logoSrc}
          className="w-36 md:w-48 lg:w-52"
          alt="ChatBlix Logo"
        />
      </figure>
    </div>
  );
};

export default Logo;
