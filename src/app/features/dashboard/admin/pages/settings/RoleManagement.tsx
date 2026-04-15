import { useCallback, useEffect, useMemo, useState } from "react";
import { useTenantStore } from "@/app/store/tenant.store";
import { ColumnDef } from "@tanstack/react-table";
import { RefreshCw, Plus } from "lucide-react";
import { Button, Input } from "@/app/components/ui";
import { GenericTable } from "@/app/features/dashboard/admin/component/table/GenericTable";
import { toast } from "sonner";
import { Modal } from "@/app/components/common";

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
    description: string;
    permissions?: string[];
  };
}

interface RoleForm {
  name: string;
  description: string;
  permissions: string[];
}

interface EditRoleForm extends RoleForm {
  id: string;
  addPermissions: string[];
  removePermissions: string[];
}

const AVAILABLE_PERMISSIONS = [
  "conversations:read",
  "messages:read",
  "messages:update",
  "reports:read",
  "reports:export",
];

const RoleManagement = () => {
  const {
    tenantUsers,
    roles,
    loading,
    roleLoading,
    inviteLoading,
    fetchTenantUsers,
    fetchTenantRoles,
    assignRole,
    inviteMember,
    createTenantRole,
    updateTenantRole,
  } = useTenantStore();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({ email: "", role: "" });
  const [newRole, setNewRole] = useState<RoleForm>({
    name: "",
    description: "",
    permissions: [],
  });
  const [editRole, setEditRole] = useState<EditRoleForm>({
    id: "",
    name: "",
    description: "",
    permissions: [],
    addPermissions: [],
    removePermissions: [],
  });

  const availableRoles = useMemo(
    () => roles.map((r) => ({ id: r.id, name: r.name })),
    [roles],
  );

  // Initial load
  useEffect(() => {
    (async () => {
      try {
        await Promise.all([fetchTenantUsers(), fetchTenantRoles()]);
      } catch {
        toast.error("Failed to load tenant data");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- HANDLERS ----------

  const handleRefresh = useCallback(async () => {
    try {
      await fetchTenantUsers();
      toast.success("Users refreshed successfully");
    } catch {
      toast.error("Failed to refresh users");
    }
  }, [fetchTenantUsers]);

  const handleInvite = useCallback(async () => {
    if (!newUser.email || !newUser.role) {
      toast.error("Email and role are required");
      return;
    }
    try {
      await inviteMember({ email: newUser.email.trim(), role: newUser.role });
      toast.success(`Invitation sent to ${newUser.email}`);
      setIsInviteModalOpen(false);
      setNewUser({ email: "", role: "" });
      await fetchTenantUsers();
    } catch {
      toast.error("Failed to invite member");
    }
  }, [newUser, inviteMember, fetchTenantUsers]);

  const handleCreateRole = useCallback(async () => {
    if (!newRole.name || !newRole.description) {
      toast.error("Name and description are required");
      return;
    }
    try {
      await createTenantRole(newRole);
      toast.success("Role created successfully");
      setIsCreateRoleModalOpen(false);
      setNewRole({ name: "", description: "", permissions: [] });
      await fetchTenantRoles();
    } catch {
      toast.error("Failed to create role");
    }
  }, [newRole, createTenantRole, fetchTenantRoles]);

  const handleEditRole = useCallback(
    (roleId: string, roleData: TenantUserRow["role"]) => {
      setEditRole({
        id: roleId,
        name: roleData.name,
        description: roleData.description,
        permissions: roleData.permissions || [],
        addPermissions: [],
        removePermissions: [],
      });
      setIsEditRoleModalOpen(true);
    },
    [],
  );

  const handleUpdateRole = useCallback(async () => {
    const { id, addPermissions, removePermissions } = editRole;
    if (!editRole.name || !editRole.description) {
      toast.error("Name and description are required");
      return;
    }

    if (addPermissions.length === 0 && removePermissions.length === 0) {
      toast.error("At least one permission must be modified.");
      return;
    }

    try {
      await updateTenantRole(id, { addPermissions, removePermissions });
      toast.success("Role updated successfully");
      setIsEditRoleModalOpen(false);
      await Promise.all([fetchTenantRoles(), fetchTenantUsers()]);
    } catch {
      toast.error("Failed to update role");
    }
  }, [editRole, updateTenantRole, fetchTenantRoles, fetchTenantUsers]);

  // ---------- COLUMNS ----------
  const columns = useMemo<ColumnDef<TenantUserRow>[]>(
    () => [
      {
        accessorKey: "user.name",
        header: "Name",
        cell: (info) => info.getValue() || "-",
      },
      {
        accessorKey: "user.email",
        header: "Email",
        cell: (info) => info.getValue() || "-",
      },
      {
        accessorKey: "role.name",
        header: "Role",
        cell: (info) => info.getValue() || "-",
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

          return (
            <select
              className="border border-grey-light rounded px-2 py-1 text-sm"
              value={currentRoleId}
              onChange={async (e) => {
                const selectedRoleId = e.target.value;
                if (selectedRoleId !== currentRoleId) {
                  try {
                    await assignRole(userId, selectedRoleId);
                    toast.success(`Role updated for ${row.original.user.name}`);
                    await fetchTenantUsers();
                  } catch {
                    toast.error("Failed to assign role");
                  }
                }
              }}
            >
              {availableRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            label="Edit"
            variant="secondary"
            onClick={() =>
              handleEditRole(row.original.role.id, row.original.role)
            }
          />
        ),
      },
    ],
    [availableRoles, assignRole, fetchTenantUsers, handleEditRole],
  );

  const isLoading = loading || roleLoading || inviteLoading;

  // ---------- UI ----------
  return (
    <div className="p-6 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
          <span className="animate-pulse text-gray-600">Loading...</span>
        </div>
      )}

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

      <GenericTable
        data={tenantUsers}
        columns={columns}
        emptyMessage={loading ? "Loading users..." : "No users found"}
      />

      {/* 🔹 Invite Member Modal */}
      {isInviteModalOpen && (
        <Modal
          title="Invite Member"
          onClose={() => setIsInviteModalOpen(false)}
        >
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value.trim() })
              }
            />
            <select
              className="w-full border px-3 py-2 rounded"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
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
        </Modal>
      )}

      {/* 🔹 Create Role Modal */}
      {isCreateRoleModalOpen && (
        <Modal
          title="Create Role"
          onClose={() => setIsCreateRoleModalOpen(false)}
        >
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Role Name"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Description"
              value={newRole.description}
              onChange={(e) =>
                setNewRole({ ...newRole, description: e.target.value })
              }
            />
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Permissions</h4>
              {AVAILABLE_PERMISSIONS.map((perm) => (
                <label key={perm} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={newRole.permissions.includes(perm)}
                    onChange={() =>
                      setNewRole((prev) => ({
                        ...prev,
                        permissions: prev.permissions.includes(perm)
                          ? prev.permissions.filter((p) => p !== perm)
                          : [...prev.permissions, perm],
                      }))
                    }
                  />
                  {perm}
                </label>
              ))}
            </div>
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
        </Modal>
      )}

      {/* 🔹 Edit Role Modal */}
      {isEditRoleModalOpen && (
        <Modal title="Edit Role" onClose={() => setIsEditRoleModalOpen(false)}>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Role Name"
              value={editRole.name}
              onChange={(e) =>
                setEditRole({ ...editRole, name: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Description"
              value={editRole.description}
              onChange={(e) =>
                setEditRole({ ...editRole, description: e.target.value })
              }
            />
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Modify Permissions</h4>
              {AVAILABLE_PERMISSIONS.map((perm) => (
                <div key={perm} className="flex items-center justify-between">
                  <label className="text-sm">{perm}</label>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={editRole.addPermissions.includes(perm)}
                      onChange={() =>
                        setEditRole((prev) => ({
                          ...prev,
                          addPermissions: prev.addPermissions.includes(perm)
                            ? prev.addPermissions.filter((p) => p !== perm)
                            : [...prev.addPermissions, perm],
                        }))
                      }
                    />
                    <input
                      type="checkbox"
                      checked={editRole.removePermissions.includes(perm)}
                      onChange={() =>
                        setEditRole((prev) => ({
                          ...prev,
                          removePermissions: prev.removePermissions.includes(
                            perm,
                          )
                            ? prev.removePermissions.filter((p) => p !== perm)
                            : [...prev.removePermissions, perm],
                        }))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
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
        </Modal>
      )}
    </div>
  );
};

export default RoleManagement;
