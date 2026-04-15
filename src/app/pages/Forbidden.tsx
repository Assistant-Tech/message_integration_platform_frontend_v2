import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-primary-light flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              403 - Forbidden
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You don’t have permission to view this page.
            </p>
          </div>

          <div className="mt-6">
            <Link
              to={APP_ROUTES.PUBLIC.HOME}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
