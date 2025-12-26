import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "@/app/styles/globals.css";
import AppRoutes from "@/app/router/AppRoutes";
import { ScrollToTop } from "@/app/hooks/ui/ScrollToTop";
import { useAuthStore } from "@/app/store/auth.store";
import ErrorBoundary from "@/app/ErrorBoundary";
import { useQueryClient } from "@tanstack/react-query";
import { CURRENT_USER_QUERY_KEY } from "./hooks/useCurrentUserQuery";
import { fetchCurrentUser } from "@/app/services/auth.services";

const App = () => {
  const queryClient = useQueryClient();
  const { refreshAccessToken, setRefreshing, resetAuth, isAuthenticated, accessToken } =
    useAuthStore();

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      if (!isAuthenticated) return;

      try {
        setRefreshing(true);
        if(accessToken) return;

        const token = await refreshAccessToken();

        if (token) {
          await queryClient.prefetchQuery({
            queryKey: CURRENT_USER_QUERY_KEY,
            queryFn: async () => {
              const res = await fetchCurrentUser();
              return (res.data ?? res) as any;
            },
          });
        } else {
          resetAuth();
        }
      } catch (err) {
        if (!cancelled) resetAuth();
      } finally {
        if (!cancelled) setRefreshing(false);
      }
    };

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, refreshAccessToken, setRefreshing, resetAuth, queryClient, accessToken]);

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
