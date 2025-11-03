import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/app/services/auth.services";
import { useAuthStore } from "@/app/store/auth.store";
import type { User } from "@/app/types/auth.types";
import { useEffect } from "react";
import { QUERY_KEYS } from "../constants/queryKeys";

export const CURRENT_USER_QUERY_KEY = QUERY_KEYS.CURRENT_USER;

export const useCurrentUserQuery = () => {
  const queryClient = useQueryClient();
  const { setUser, setAccessToken } = useAuthStore();

  const query = useQuery<User>({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: async () => {
      const res = await fetchCurrentUser();
      return (res.data ?? res) as User;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) setUser(query.data);
    if (query.isError) setAccessToken(null);
  }, [query.isSuccess, query.isError, query.data, setUser, setAccessToken]);

  const refetchUser = () =>
    queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });

  return { ...query, refetchUser };
};
