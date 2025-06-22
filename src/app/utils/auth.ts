import { UserRole } from "@/app/types/auth";

/**
 * Check if user has any of the required roles
 */
export const hasRole = (
  userRole: UserRole,
  requiredRoles: UserRole[],
): boolean => {
  return requiredRoles.includes(userRole);
};

/**
 * Check if user has admin role
 */
export const isAdmin = (userRole: UserRole): boolean => {
  return userRole === "admin";
};

/**
 * Check if user has user role
 */
export const isUser = (userRole: UserRole): boolean => {
  return userRole === "user";
};

/**
 * Check if user has moderator role
 */
export const isModerator = (userRole: UserRole): boolean => {
  return userRole === "moderator";
};

/**
 * Get redirect path based on user role
 */
export const getRedirectPath = (userRole: UserRole): string => {
  switch (userRole) {
    case "admin":
      return "/admin/dashboard";
    case "moderator":
      return "/moderator/dashboard";
    case "user":
    default:
      return "/dashboard";
  }
};

/**
 * Check if token is expired
 */

// FIXES REQUIRED

// export const isTokenExpired = (token: string): boolean => {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.exp * 1000 < Date.now();
//   } catch {
//     return true;
//   }
// };

/**
 * Refresh token helper
 */
export const refreshAuthToken = async (
  refreshToken: string,
): Promise<string> => {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  return data.token;
};
