import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import "@/app/styles/globals.css";
import AppRoutes from "@/app/AppRoutes";
import ErrorBoundary from "@/app/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div>
          <AppRoutes />
          <Toaster position="top-right" richColors />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
