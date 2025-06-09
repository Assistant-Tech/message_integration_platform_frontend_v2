import { APP_ROUTES } from "@/app/constants/routes";
import { Link } from "react-router-dom";

const Agreement = () => {
  return (
    <>
      By providing your contact information, you agree to our{" "}
      <Link
        to={APP_ROUTES.PUBLIC.TERMSCONDITION}
        className="text-primary underline"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link to={APP_ROUTES.PUBLIC.POLICY} className="text-primary underline">
        Privacy Policy
      </Link>
      .
    </>
  );
};

export default Agreement;
