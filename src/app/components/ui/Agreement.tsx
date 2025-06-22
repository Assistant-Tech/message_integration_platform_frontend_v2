import { APP_ROUTES } from "@/app/constants/routes";
import { Link } from "react-router-dom";

const Agreement = () => {
  return (
    <>
      <span className="text-grey">
        By providing your contact information, you agree to our{" "}
      </span>
      <Link
        to={APP_ROUTES.PUBLIC.TERMSCONDITION}
        className="text-primary underline"
      >
        Terms of Service
      </Link>{" "}
      <span className="text-grey">and </span>
      <Link to={APP_ROUTES.PUBLIC.POLICY} className="text-primary underline">
        Privacy Policy
      </Link>
      .
    </>
  );
};

export default Agreement;
