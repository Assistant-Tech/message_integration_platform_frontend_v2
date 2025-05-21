import { Link } from "react-router-dom";
import { Button } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";

interface AuthButtonsProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}
const AuthButtons: React.FC<AuthButtonsProps> = ({
  isMobile = false,
  onItemClick,
}) => {
  if (isMobile) {
    return (
      <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
        <Link
          to={APP_ROUTES.PUBLIC.LOGIN}
          className="block w-full text-center rounded-md px-4 py-2 body-bold-16 text-primary hover:bg-white transition-colors"
          onClick={onItemClick}
        >
          Log In
        </Link>
        <Link
          to={APP_ROUTES.PUBLIC.REGISTER}
          className="block w-full text-center border rounded-md px-4 py-2 button-semi-bold-16 text-white bg-primary hover:text-primary hover:bg-white transition-colors"
          onClick={onItemClick}
        >
          Start Free Trial
        </Link>
        <Link
          to="/demo"
          className="block w-full text-center mt-2 rounded-md border border-primary px-4 py-2 button-semi-bold-16 text-primary hover:bg-primary hover:text-white transition-colors"
          onClick={onItemClick}
        >
          Book a Demo
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center space-x-4 ">
      <Link
        to={APP_ROUTES.PUBLIC.LOGIN}
        className="body-bold-16 text-grey hover:text-primary transition-colors cursor-pointer"
      >
        Log In
      </Link>
      <Link to={APP_ROUTES.PUBLIC.REGISTER}>
        <Button
          label="Start Free Trial"
          variant="primary"
          className="cursor-pointer"
        />
      </Link>
      <Link to="/demo" className="cursor-pointer">
        <Button
          label="Book a Demo"
          variant="neutral"
          className="cursor-pointer"
        />
      </Link>
    </div>
  );
};
export default AuthButtons;
