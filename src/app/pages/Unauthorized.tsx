import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">Access Denied</h2>
        <p className="text-sm text-gray-600">
          You do not have permission to view this page.
        </p>

        <div>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Go to Home
          </Link>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            If you believe this is an error, please contact your administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
