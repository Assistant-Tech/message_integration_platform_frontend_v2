import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "@/app/styles/globals.css";
import AppRoutes from "@/app/router/AppRoutes";
import { ScrollToTop } from "@/app/hooks/ui/ScrollToTop";
import ErrorBoundary from "@/app/ErrorBoundary";
// import DevBanner from "@/app/components/dev/DevBanner";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* <DevBanner /> */}
        <ScrollToTop />
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
