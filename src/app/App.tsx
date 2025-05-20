import { BrowserRouter } from "react-router-dom";

import "@/app/styles/globals.css";
import AppRoutes from "@/app/AppRoutes";
import ErrorBoundary from "@/app/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
