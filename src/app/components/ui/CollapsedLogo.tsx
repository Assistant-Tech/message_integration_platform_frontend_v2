import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";

interface CollapsedLogoProps {
  className?: string;
}

const CollapsedLogo: React.FC<CollapsedLogoProps> = ({ className = "" }) => {
  return (
    <Link
      to={APP_ROUTES.PUBLIC.HOME}
      className={`flex items-center space-x-2 ${className}`}
    >
      <figure className="flex justify-center items-center gap-2">
        <img
          src={
            "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1751347732/fab_c5aoyj.png"
          }
          className="w-16 md:w-24 lg:w-36"
          alt="ChatBlix Logo"
        />
      </figure>
    </Link>
  );
};

export default CollapsedLogo;
