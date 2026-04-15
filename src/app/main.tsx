import ReactDOM from "react-dom/client";
import "@/app/styles/globals.css";
import App from "@/app/App";
import React from "react";
import { BannerProvider } from "./context/BannerContext";
import queryClient, { persister } from "@/app/utils/queryClient";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  // <React.StrictMode>

  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister: persister }}
  >
    <BannerProvider>
      <App />
      {import.meta.env.DEV && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </React.Suspense>
      )}
    </BannerProvider>
  </PersistQueryClientProvider>,
  // </React.StrictMode>,
);
