import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  mfalogin,
  signup,
  verifyEmail,
  onboarding,
  logout,
  refreshAccessTokenAPI,
  fetchCurrentUser,
} from "@/app/services/auth.services";
import { useAuthStore } from "@/app/store/auth.store";
import { toast } from "sonner";
import type {
  LoginSuccessResponse,
  MFARequiredResponse,
  User,
} from "@/app/types/auth.types";

const AUTH_QUERY_KEYS = {
  all: ["auth"],
  currentUser: ["auth", "current-user"],
  profile: (userId: string) => ["auth", "profile", userId],
} as const;

/**
 * Fetch current user profile
 * Cached for 5 minutes
 * Automatically syncs with auth store
 * Only fetches when authenticated
 */
export const useCurrentUser = () => {
  const { setTenantSlug, setUser, accessToken, setIsWalkthroughRequired } =
    useAuthStore();

  return useQuery<User>({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: async () => {
      const res = await fetchCurrentUser();
      const user = (res.data ?? res) as User;

      // Sync to auth store so RoleBasedRoutes and other guards can read it
      setUser(user);
      if (user.tenant?.slug) {
        setTenantSlug(user.tenant.slug);
      }

      // Rehydrate walkthrough flag on fresh session from the authoritative
      // source (tenant object). Undefined means backend hasn't shipped yet —
      // leave local flag untouched in that case.
      if (typeof user.tenant?.isWalkthroughRequired === "boolean") {
        setIsWalkthroughRequired(user.tenant.isWalkthroughRequired);
      }

      return user;
    },
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

/**
 * Sign up mutation
 */
export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
      invitationToken,
    }: {
      name: string;
      email: string;
      password: string;
      invitationToken?: string;
    }) => signup(name, email, password, invitationToken),
    onSuccess: () => {
      toast.success("Signup successful! Please verify your email");
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.all });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to signup");
    },
  });
};

/**
 * Verify email mutation
 */
export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => verifyEmail(token),
    onSuccess: () => {
      toast.success("Email verified successfully!");
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to verify email");
    },
  });
};

/**
 * Onboarding mutation
 */
export const useOnboarding = () => {
  const queryClient = useQueryClient();
  const setRequiresOnboarding = useAuthStore((s) => s.setRequiresOnboarding);
  const setIsWalkthroughRequired = useAuthStore(
    (s) => s.setIsWalkthroughRequired,
  );

  return useMutation({
    mutationFn: (data: FormData) => onboarding(data),
    onSuccess: (res: any) => {
      setRequiresOnboarding(false);

      // Backend spec: onboarding response carries the updated tenant with
      // `isWalkthroughRequired: true`. Seed the local flag from it so the
      // walkthrough fires on the very next dashboard entry.
      const tenantFlag = res?.data?.tenant?.isWalkthroughRequired;
      if (typeof tenantFlag === "boolean") {
        setIsWalkthroughRequired(tenantFlag);
      }

      toast.success("Onboarding completed!");
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to complete onboarding");
    },
  });
};

/**
 * Login mutation
 * Sets tokens in auth store on success
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const {
    setAccessToken,
    setCsrfToken,
    setTenantSlug,
    setAuthenticated,
    setRequiresOnboarding,
    setIsWalkthroughRequired,
  } = useAuthStore();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (res: LoginSuccessResponse | MFARequiredResponse) => {
      if ("mfaRequired" in res.data) {
        // MFA required - don't set tokens yet
        return;
      }

      // Set tokens in store for successful login
      const successRes = res as LoginSuccessResponse;
      setAccessToken(successRes.data.accessToken);
      setCsrfToken(successRes.data.csrfToken);
      setTenantSlug(successRes.data.tenantSlug);
      setRequiresOnboarding(successRes.data.requiresOnboarding);
      setIsWalkthroughRequired(
        Boolean(successRes.data.isWalkthroughRequired),
      );
      setAuthenticated(true);

      // Invalidate to refetch user profile
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to login");
    },
  });
};

/**
 * MFA login mutation
 * Sets tokens in auth store on success
 */
export const useMfaLogin = () => {
  const queryClient = useQueryClient();
  const {
    setAccessToken,
    setCsrfToken,
    setTenantSlug,
    setAuthenticated,
    setRequiresOnboarding,
  } = useAuthStore();

  return useMutation({
    mutationFn: ({
      mfaToken,
      totp,
      recoveryPhrase,
    }: {
      mfaToken: string;
      totp?: string;
      recoveryPhrase?: string[];
    }) => mfalogin(mfaToken, totp, recoveryPhrase),
    onSuccess: (res: LoginSuccessResponse) => {
      // Set tokens in store after MFA verification
      setAccessToken(res.data.accessToken);
      setCsrfToken(res.data.csrfToken);
      setTenantSlug(res.data.tenantSlug);
      setRequiresOnboarding(res.data.requiresOnboarding);
      setAuthenticated(true);

      // Invalidate to refetch user profile
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
    },
    onError: (error: any) => {
      toast.error(error?.message || "MFA verification failed");
    },
  });
};

/**
 * Logout mutation
 * Clears all auth data on API success
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { resetAuth } = useAuthStore();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Clear auth store
      resetAuth();

      // Clear all queries from memory
      queryClient.clear();

      // Clear persisted query cache from localStorage
      window.localStorage.removeItem("chatblix-query-cache");

      toast.success("Logged out successfully");
    },
    onError: (error: any) => {
      console.error("Logout API failed:", error);
      // Still clear auth data on error
      resetAuth();
      queryClient.clear();
      window.localStorage.removeItem("chatblix-query-cache");

      toast.error("Failed to logout from server");
    },
  });
};

/**
 * Refresh access token mutation
 */
export const useRefreshAccessToken = () => {
  const { setAccessToken, setCsrfToken, resetAuth, setRefreshing } =
    useAuthStore();

  return useMutation({
    mutationFn: () => refreshAccessTokenAPI(),
    onSuccess: (data) => {
      if (data?.accessToken && data?.csrfToken) {
        setAccessToken(data.accessToken);
        setCsrfToken(data.csrfToken);
      } else {
        resetAuth();
      }
      setRefreshing(false);
    },
    onError: (error: any) => {
      console.error("Token refresh failed:", error);
      resetAuth();
      setRefreshing(false);
    },
  });
};
