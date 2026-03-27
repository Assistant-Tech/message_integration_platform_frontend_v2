import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import { LOGO_FAB_ICON_URL } from "@/app/constants/image-cloudinary";

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
          src={LOGO_FAB_ICON_URL}
          className="w-16 md:w-24 lg:w-36"
          alt="ChatBlix Logo"
        />
      </figure>
    </Link>
  );
};

export default CollapsedLogo;
