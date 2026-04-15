import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "@/app/styles/globals.css";
import AppRoutes from "@/app/router/AppRoutes";
import { ScrollToTop } from "@/app/hooks/ui/ScrollToTop";
import ErrorBoundary from "@/app/ErrorBoundary";

const App = () => {
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
