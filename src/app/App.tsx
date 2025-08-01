import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import "@/app/styles/globals.css";
import AppRoutes from "@/app/AppRoutes";
import ErrorBoundary from "@/app/ErrorBoundary";
import { ScrollToTop } from "@/app/hooks/ui/ScrollToTop";
import { usePerformanceMonitoring } from "@/app/hooks/usePerformanceMonitoring";

const App = () => {
  // Initialize performance monitoring
  usePerformanceMonitoring();

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
