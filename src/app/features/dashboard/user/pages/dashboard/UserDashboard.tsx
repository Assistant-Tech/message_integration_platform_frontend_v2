import { useAuthStore } from "@/app/store/auth.store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useMemo, useEffect } from "react";
import { Button } from "@/app/components/ui";
import api from "@/app/services/api/axios";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, isloading, logout } = useAuthStore();
  console.log("🚀 ~ Dashboard ~ user:", user);

  // Redirect to login only after loading is complete
  useEffect(() => {
    if (!isloading && !user) {
      navigate("/login");
    }
  }, [isloading, user, navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleAutoTokenRefresh = async () => {
    try {
      const response = await api.get("test/permission");
      if (response.status === 401) {
        toast.error("Token Expired! Refreshing...");
      } else {
        toast.success(response.data.message || "Token refreshed successfully!");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const userInfo = useMemo(() => {
    if (!user) return null;

    return (
      <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
        <h2 className="text-lg font-medium text-primary">User Information</h2>
        <p className="mt-2 text-grey-dark font-mono text-sm sm:text-base">
          <span className="font-semibold text-grey-medium">User ID:</span>{" "}
          {user.id}
        </p>
        <p className="mt-2 text-grey-dark font-mono text-sm sm:text-base">
          <span className="font-semibold text-grey-medium">Email:</span>{" "}
          {user.email || "No email found"}
        </p>
        <p className="mt-2 text-grey-dark font-mono text-sm sm:text-base">
          <span className="font-semibold text-grey-medium">Verification:</span>{" "}
          {user.isVerified ? "Verified" : "Not Verified"}
        </p>
      </div>
    );
  }, [user]);

  if (isloading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl font-semibold text-gray-800">
          Loading user data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* <Button
        label="Auto Token Refresh"
        onClick={handleAutoTokenRefresh}
        variant="information"
      /> */}

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Welcome to the Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {userInfo}

        <div className="text-gray-600">
          <p className="text-lg leading-relaxed">
            This is your personal dashboard. From here, you can manage your
            account, update your profile, and access various features of the
            application. We're glad to have you here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
