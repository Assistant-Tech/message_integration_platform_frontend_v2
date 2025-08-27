import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
}

const Logo: React.FC<LogoProps> = ({ className = "", variant = "default" }) => {
  const logoSrc =
    variant === "white"
      ? "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1755418244/white-logo_oxdple.png"
      : "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1751347733/Chatblix_Logo_xtkjmp.png";

  return (
    <Link
      to={APP_ROUTES.PUBLIC.HOME}
      className={`flex items-center space-x-2 ${className}`}
    >
      <figure className="flex justify-center items-center gap-2">
        <img
          src={logoSrc}
          className="w-36 md:w-48 lg:w-52"
          alt="ChatBlix Logo"
        />
      </figure>
    </Link>
  );
};

export default Logo;
