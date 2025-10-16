import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "@/app/styles/globals.css";
import AppRoutes from "@/app/router/AppRoutes";
import { ScrollToTop } from "@/app/hooks/ui/ScrollToTop";
import { useAuthStore } from "@/app/store/auth.store";
import ErrorBoundary from "@/app/ErrorBoundary";
import { BannerProvider } from "@/app/context/BannerContext";

const App = () => {
  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      const {
        refreshAccessToken,
        fetchCurrentUserProfile,
        setRefreshing,
        resetAuth,
        isAuthenticated,
      } = useAuthStore.getState();

      if (!isAuthenticated) return;

      try {
        setRefreshing(true);
        const newToken = await refreshAccessToken();
        if (newToken) {
          await fetchCurrentUserProfile();
        } else {
          resetAuth();
        }
      } catch {
        if (!cancelled) resetAuth();
      } finally {
        if (!cancelled) setRefreshing(false);
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
