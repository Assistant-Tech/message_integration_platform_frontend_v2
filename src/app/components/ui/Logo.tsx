import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import logo from "@/app/assets/logo.svg";
import { cn } from "@/app/utils/cn";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => (
  <Link
    to={APP_ROUTES.PUBLIC.HOME}
    className={`flex items-center space-x-2 ${className}`}
  >
    <figure className="flex justify-center items-center gap-2">
      <img
        src={logo}
        className="h-12 w-12 text-primary"
        alt="Assistant Tech Logo"
      />
      <h1 className="text-base sm:text-lg xl:text-2xl font-bold font-nunito">
        ASSISTANT <span className="text-secondary">TECH</span>
      </h1>
    </figure>
  </Link>
);
export default Logo;
