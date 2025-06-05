import { useAuthStore } from "@/app/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequest, RegisterRequest, LoginResponse } from "@/app/types/auth";

// API functions (replace with your actual API calls)
const authAPI = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },

  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  },

  logout: async (token: string): Promise<void> => {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: loginStore,
    logout: logoutStore,
    setLoading,
    updateUser,
  } = useAuthStore();

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      loginStore(data.user, data.token);
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
    onSuccess: (data) => {
      loginStore(data.user, data.token);
      queryClient.invalidateQueries();
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
    mutationFn: () => authAPI.logout(token!),
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Still logout locally even if server request fails
      logoutStore();
      queryClient.clear();
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

  return {
    user,
    token,
    isAuthenticated,
    isLoading:
      isLoading || loginMutation.isPending || registerMutation.isPending,
    login,
    register,
    logout,
    updateUser,
    // Mutation states for UI feedback
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
