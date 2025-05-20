import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import logo from "@/app/assets/logo.svg";

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
      <h1 className="h4-bold-24 xs:body-bold-16">
        ASSISTANT{" "}
        <span className="h4-bold-24 sm:body-bold-16 text-secondary">TECH</span>
      </h1>
    </figure>
  </Link>
);
export default Logo;
