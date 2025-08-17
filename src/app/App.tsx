import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";

import "@/app/styles/globals.css";
import AppRoutes from "@/app/router/AppRoutes";
import { ScrollToTop } from "@/app/hooks/ui/ScrollToTop";
import api from "@/app/services/api/axios";
import { useAuthStore } from "@/app/store/auth.store";
import ErrorBoundary from "@/app/ErrorBoundary";

const App = () => {
  const { setAccessToken, setUser, setRefreshing, isRefreshing, csrfToken } =
    useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // use : user/me to get the users profile
        // const response = await api.get("/auth/refresh", {
        //   headers: {
        //     "X-CSRF-Token": csrfToken,
        //   },
        // });
        // const { accessToken, user } = response.data;
        // setAccessToken(accessToken);
        // setUser(user);
      } catch (error) {
        console.log(
          "No valid refresh token found, or an error occurred during refresh."
        );
        setAccessToken(null);
        setUser(null);
      } finally {
        setRefreshing(false);
      }
    };
    initAuth();
  }, [setAccessToken, setUser, setRefreshing, csrfToken]);

  if (isRefreshing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin text-primary" size={48} />
          <div className="text-center">
            <p className="text-lg font-medium text-grey">Loading Chatblix...</p>
            <p className="text-sm text-grey-medium mt-1">
              Setting up your workspace
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <div>
          <AppRoutes />
          <Toaster position="top-right" richColors />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
