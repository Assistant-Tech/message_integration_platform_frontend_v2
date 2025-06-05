import { APP_ROUTES } from "@/app/constants/routes";
import { Link } from "react-router-dom";

const Agreement = () => {
  return (
    <section>
      <p className="text-grey-medium text-center sm:text-start body-regular-16">
        By providing your contact information, you agree to our{" "}
        <Link to={APP_ROUTES.PUBLIC.TERMSCONDITION}>
          <span className="text-primary underline"> Terms of Service </span>
          and{" "}
        </Link>
        <Link to={APP_ROUTES.PUBLIC.POLICY}>
          <span className="text-primary underline">Privacy Policy</span>.
        </Link>
      </p>
    </section>
  );
};

export default Agreement;
