import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24 * 7,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: "chatblix-query-cache",
  throttleTime: 1000,
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24,
});

// export
export default queryClient;
