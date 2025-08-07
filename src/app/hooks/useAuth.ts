import { useAuthStore } from "@/app/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequest, RegisterRequest, LoginResponse } from "@/app/types/auth";
import api from "@/app/services/api/api";
import { useNavigate } from "react-router-dom";

// API functions using your existing api service
const authAPI = {
  
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await api.post("/auth/signup", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  checkOnboardingStatus: async (): Promise<{ isCompleted: boolean }> => {
    const response = await api.get("/auth/onboarding/status");
    return response.data;
  },

  completeOnboarding: async (): Promise<void> => {
    await api.post("/auth/onboarding/complete");
  },
};

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    isOnboardingCompleted,
    login: loginStore,
    logout: logoutStore,
    setLoading,
    updateUser,
    setOnboardingCompleted,
  } = useAuthStore();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async (data) => {
      // Check if user has completed onboarding
      try {
        const onboardingStatus = await authAPI.checkOnboardingStatus();
        loginStore(data.user, data.token, onboardingStatus.isCompleted);
        
        if (onboardingStatus.isCompleted) {
          // User has completed onboarding, redirect to dashboard
          const dashboardPath = data.user.role === "admin" ? "/admin/dashboard" : "/dashboard";
          navigate(dashboardPath);
        } else {
          // User needs to complete onboarding
          navigate("/onboardingform/step-1");
        }
      } catch (error) {
        // If we can't check onboarding status, assume not completed
        loginStore(data.user, data.token, false);
        navigate("/onboardingform/step-1");
      }
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Login error:", error);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async (data) => {
      // After registration, user should complete onboarding
      loginStore(data.user, data.token, false);
      queryClient.invalidateQueries();
      // Don't navigate here - let the form handle navigation to check-email
    },
    onError: (error) => {
      console.error("Registration error:", error);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Still logout locally even if server request fails
      logoutStore();
      queryClient.clear();
      navigate("/login");
    },
  });

  const completeOnboardingMutation = useMutation({
    mutationFn: authAPI.completeOnboarding,
    onSuccess: () => {
      setOnboardingCompleted(true);
      // Redirect to dashboard after onboarding completion
      const dashboardPath = user?.role === "admin" ? "/admin/dashboard" : "/dashboard";
      navigate(dashboardPath);
    },
    onError: (error) => {
      console.error("Onboarding completion error:", error);
    },
  });

  const login = async (credentials: LoginRequest) => {
    return loginMutation.mutateAsync(credentials);
  };

  const register = async (data: RegisterRequest) => {
    return registerMutation.mutateAsync(data);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const completeOnboarding = () => {
    completeOnboardingMutation.mutate();
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading:
      isLoading || loginMutation.isPending || registerMutation.isPending,
    isOnboardingCompleted,
    login,
    register,
    logout,
    completeOnboarding,
    updateUser,
    // Mutation states for UI feedback
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isCompletingOnboarding: completeOnboardingMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
