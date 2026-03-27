import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tenantServices } from "@/app/services/tenant.services";
import {
  InviteMemberPayload,
  CreateTenantRolePayload,
} from "@/app/types/tenant.types";
import { toast } from "sonner";

const TENANT_QUERY_KEYS = {
  all: ["tenant"],
  users: ["tenant", "users"],
  roles: ["tenant", "roles"],
  details: ["tenant", "details"],
  activity: (page: number, limit: number) => [
    "tenant",
    "activity",
    page,
    limit,
  ],
} as const;

/**
 * Fetch tenant users
 * Cached for 5 minutes
 */
export const useTenantUsers = () => {
  return useQuery({
    queryKey: TENANT_QUERY_KEYS.users,
    queryFn: () => tenantServices.getTenantUsers(),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

/**
 * Fetch tenant roles
 * Cached for 5 minutes
 */
export const useTenantRoles = () => {
  return useQuery({
    queryKey: TENANT_QUERY_KEYS.roles,
    queryFn: () => tenantServices.getTenantRoles(),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

/**
 * Fetch login activity with pagination
 * Cached for 2 minutes due to real-time nature
 */
export const useTenantLoginActivity = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: TENANT_QUERY_KEYS.activity(page, limit),
    queryFn: () => tenantServices.getLoginActivity(page, limit),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

/**
 * Fetch tenant details
 * Cached for 10 minutes
 */
export const useTenantDetails = () => {
  return useQuery({
    queryKey: TENANT_QUERY_KEYS.details,
    queryFn: () => tenantServices.getTenantDetails(),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Create tenant role mutation
 * Automatically invalidates roles query
 */
export const useCreateTenantRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTenantRolePayload) =>
      tenantServices.createTenantRoles(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TENANT_QUERY_KEYS.roles });
      toast.success("Role created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create role");
    },
  });
};

/**
 * Update tenant role mutation
 * Automatically invalidates roles query
 */
export const useUpdateTenantRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      roleId,
      payload,
    }: {
      roleId: string | number;
      payload: { addPermissions?: string[]; removePermissions?: string[] };
    }) => tenantServices.updateTenantRole(roleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TENANT_QUERY_KEYS.roles });
      toast.success("Role updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update role");
    },
  });
};

/**
 * Assign role to user mutation
 * Automatically invalidates users and roles queries
 */
export const useAssignRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) =>
      tenantServices.assignRole(userId, { roleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TENANT_QUERY_KEYS.users });
      queryClient.invalidateQueries({ queryKey: TENANT_QUERY_KEYS.roles });
      toast.success("Role assigned successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to assign role");
    },
  });
};

/**
 * Invite member mutation
 * Automatically invalidates users query
 */
export const useInviteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: InviteMemberPayload) =>
      tenantServices.inviteMember(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TENANT_QUERY_KEYS.users });
      toast.success("Member invited successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to invite member");
    },
  });
};

/**
 * Update tenant details mutation
 * Automatically invalidates details query
 */
export const useUpdateTenantDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => tenantServices.updateTenantDetails(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TENANT_QUERY_KEYS.details });
      toast.success("Tenant details updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update tenant details");
    },
  });
};
