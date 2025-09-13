import { useEffect, useMemo, useState } from "react";
import { useTenantStore } from "@/app/store/tenant.store";
import { ColumnDef } from "@tanstack/react-table";
import { RefreshCw, Plus, X } from "lucide-react";
import { Button, Input } from "@/app/components/ui";
import { GenericTable } from "@/app/features/dashboard/admin/component/table/GenericTable";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Table row shape based on API
interface TenantUserRow {
  user: {
    id: string;
    email: string;
    name: string;
    status: string;
    joinedAt: string;
  };
  role: {
    id: string;
    name: string;
    type: string;
    description: string;
  };
}

const RoleManagement = () => {
  const {
    tenantUsers,
    loading,
    fetchTenantUsers,
    assignRole,
    inviteMember,
    inviteLoading,
    createTenantRole,
    roleLoading,
    updateTenantRole,
  } = useTenantStore();

  // 🔹 State
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", role: "" });
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [editRole, setEditRole] = useState({
    id: "",
    name: "",
    description: "",
    permissions: [] as string[],
  });

  // 🔹 Define available roles statically (you can also fetch these from an API)
  const availableRoles = useMemo(
    () => [
      { id: "member-role-id", name: "Member" },
      { id: "tenant-admin-role-id", name: "Tenant Admin" },
      { id: "admin-role-id", name: "Admin" },
    ],
    [],
  );

  // 🔹 Get actual role IDs from existing users for mapping
  const existingRoleMap = useMemo(() => {
    const map = new Map();
    tenantUsers.forEach((user) => {
      map.set(user.role.name, user.role.id);
    });
    return map;
  }, [tenantUsers]);

  // 🔹 Helper function to get role ID by name
  const getRoleIdByName = (roleName: string) => {
    // First try to get from existing users (real IDs)
    const realRoleId = existingRoleMap.get(roleName);
    if (realRoleId) return realRoleId;

    // Fallback to static roles (you'll need to replace with actual IDs)
    const staticRole = availableRoles.find((r) => r.name === roleName);
    return staticRole?.id || "";
  };

  // 🔹 Fetch users on mount
  useEffect(() => {
    fetchTenantUsers().catch(() => toast.error("Failed to load tenant users"));
  }, [fetchTenantUsers]);

  // 🔹 Refresh users
  const handleRefresh = async () => {
    try {
      await fetchTenantUsers();
      toast.success("Users refreshed successfully");
    } catch {
      toast.error("Failed to refresh users");
    }
  };

  // 🔹 Invite Member
  const handleInvite = async () => {
    if (!newUser.email || !newUser.role) {
      toast.error("Email and role are required");
      return;
    }
    try {
      // Convert role name to role ID for the invite
      const roleId = getRoleIdByName(newUser.role);
      if (!roleId) {
        toast.error("Invalid role selected");
        return;
      }

      await inviteMember({ email: newUser.email, role: roleId });
      toast.success(`Invitation sent to ${newUser.email}`);
      setIsInviteModalOpen(false);
      setNewUser({ email: "", role: "" });
      await fetchTenantUsers();
    } catch {
      toast.error("Failed to invite member");
    }
  };

  // 🔹 Create Role
  const handleCreateRole = async () => {
    if (!newRole.name || !newRole.description) {
      toast.error("Name and description are required");
      return;
    }
    try {
      await createTenantRole({
        ...newRole,
        permissions: newRole.permissions.length > 0 ? newRole.permissions : [],
      });
      toast.success("Role created successfully");
      setIsCreateRoleModalOpen(false);
      setNewRole({ name: "", description: "", permissions: [] });
      await fetchTenantUsers(); // Refresh to get updated roles
    } catch {
      toast.error("Failed to create role");
    }
  };

  // 🔹 Handle Edit Role
  const handleEditRole = (roleId: string, roleData: any) => {
    setEditRole({
      id: roleId,
      name: roleData.name,
      description: roleData.description,
      permissions: roleData.permissions || [],
    });
    setIsEditRoleModalOpen(true);
  };

  // 🔹 Handle Update Role
  const handleUpdateRole = async () => {
    if (!editRole.name || !editRole.description) {
      toast.error("Name and description are required");
      return;
    }

    const addPermissions = editRole.permissions.filter((perm) =>
      perm.startsWith("addPermissions:"),
    );
    const removePermissions = editRole.permissions.filter((perm) =>
      perm.startsWith("removePermissions:"),
    );

    if (addPermissions.length === 0 && removePermissions.length === 0) {
      toast.error("At least one permission must be added or removed.");
      return;
    }

    const payload = {
      addPermissions,
      removePermissions,
    };

    try {
      await updateTenantRole(editRole.id, payload);
      setIsEditRoleModalOpen(false);
      setEditRole({ id: "", name: "", description: "", permissions: [] });
      await fetchTenantUsers();
      toast.success("Role updated successfully");
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  // 🔹 Columns
  const columns = useMemo<ColumnDef<TenantUserRow>[]>(
    () => [
      {
        accessorKey: "user.name",
        header: "Name",
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: "user.email",
        header: "Email",
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: "role.name",
        header: "Role",
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: "user.status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <span
              className={`px-2 py-1 rounded text-xs ${
                status === "ONLINE"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "user.joinedAt",
        header: "Joined",
        cell: (info) =>
          new Date(String(info.getValue())).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
      },
      {
        id: "assignRole",
        header: "Assign Role",
        cell: ({ row }) => {
          const { id: userId } = row.original.user;
          const currentRoleId = row.original.role.id;
          const currentRoleName = row.original.role.name;
          return (
            <div className="flex space-x-2">
              <select
                value={currentRoleName}
                onChange={async (e) => {
                  const selectedRoleName = e.target.value;

                  if (selectedRoleName !== currentRoleName) {
                    const selectedRole = availableRoles.find(
                      (role) => role.name === selectedRoleName,
                    );

                    if (!selectedRole) {
                      toast.error("Invalid role selected");
                      return;
                    }

                    try {
                      // Call the API with the correct roleId
                      await assignRole(userId, currentRoleId);
                      toast.success(
                        `Role assigned to ${row.original.user.name}`,
                      );
                      await fetchTenantUsers();
                    } catch {
                      toast.error("Failed to assign role");
                    }
                  }
                }}
              >
                {availableRoles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          );
        },
      },

      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const roleId = row.original.role.id;
          return (
            <div className="flex space-x-2">
              <Button
                label="Edit"
                variant="secondary"
                onClick={() => handleEditRole(roleId, row.original.role)}
              />
            </div>
          );
        },
      },
    ],
    [availableRoles],
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Role Management</h2>
          <p className="text-sm text-gray-500">
            Manage tenant users and their roles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            label="Refresh"
            variant="secondary"
            onClick={handleRefresh}
            disabled={loading}
            IconLeft={<RefreshCw className={loading ? "animate-spin" : ""} />}
          />
          <Button
            label="Create Role"
            variant="primary"
            onClick={() => setIsCreateRoleModalOpen(true)}
            IconLeft={<Plus size={16} />}
          />
          <Button
            label="Invite Member"
            variant="information"
            onClick={() => setIsInviteModalOpen(true)}
            IconLeft={<Plus size={16} />}
          />
        </div>
      </div>

      {/* Generic Table */}
      <GenericTable
        data={tenantUsers}
        columns={columns}
        emptyMessage={loading ? "Loading users..." : "No users found"}
      />

      {/* Invite Modal */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsInviteModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Invite Member</h3>
                <button onClick={() => setIsInviteModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="">Select Role</option>
                  {availableRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  label="Cancel"
                  variant="secondary"
                  onClick={() => setIsInviteModalOpen(false)}
                />
                <Button
                  label={inviteLoading ? "Inviting..." : "Invite"}
                  variant="primary"
                  onClick={handleInvite}
                  disabled={inviteLoading}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Role Modal */}
      <AnimatePresence>
        {isCreateRoleModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCreateRoleModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Create Role</h3>
                <button onClick={() => setIsCreateRoleModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Role Name"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                />
                <Input
                  type="text"
                  placeholder="Description"
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  label="Cancel"
                  variant="secondary"
                  onClick={() => setIsCreateRoleModalOpen(false)}
                />
                <Button
                  label={roleLoading ? "Creating..." : "Create Role"}
                  variant="primary"
                  onClick={handleCreateRole}
                  disabled={roleLoading}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Role Modal */}
      <AnimatePresence>
        {isEditRoleModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEditRoleModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3 className="text-lg font-semibold">Edit Role</h3>
                <div className="space-y-2 flex flex-col">
                  <label>
                    <input
                      type="checkbox"
                      checked={editRole.permissions.includes(
                        "addPermissions:reports:export",
                      )}
                      onChange={() => {
                        const permission = "addPermissions:reports:export";
                        setEditRole({
                          ...editRole,
                          permissions: editRole.permissions.includes(permission)
                            ? editRole.permissions.filter(
                                (perm) => perm !== permission,
                              )
                            : [...editRole.permissions, permission],
                        });
                      }}
                    />
                    Add Report Export Permission
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={editRole.permissions.includes(
                        "removePermissions:messages:update",
                      )}
                      onChange={() => {
                        const permission = "removePermissions:messages:update";
                        setEditRole({
                          ...editRole,
                          permissions: editRole.permissions.includes(permission)
                            ? editRole.permissions.filter(
                                (perm) => perm !== permission,
                              )
                            : [...editRole.permissions, permission],
                        });
                      }}
                    />
                    Remove Message Update Permission
                  </label>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    label="Cancel"
                    variant="secondary"
                    onClick={() => setIsEditRoleModalOpen(false)}
                  />
                  <Button
                    label={roleLoading ? "Updating..." : "Update Role"}
                    variant="primary"
                    onClick={handleUpdateRole}
                    disabled={roleLoading}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoleManagement;
