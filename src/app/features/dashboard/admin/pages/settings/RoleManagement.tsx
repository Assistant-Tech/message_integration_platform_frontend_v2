import { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Edit, Trash2, X, RefreshCw } from "lucide-react";
import { Button, Input } from "@/app/components/ui";
import { useTenantStore } from "@/app/store/tenant.store";
import { toast } from "sonner";
import { useAuthStore } from "@/app/store/auth.store";

// Table row shape
interface TenantUserRow {
  id: string; // backend userId (UUID or string)
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  roleId: string; // UUID from backend role
  dateJoined: string;
  status: "Active" | "Pending" | "Inactive";
}

const columnHelper = createColumnHelper<TenantUserRow>();

const RoleManagement = () => {
  const {
    inviteMember,
    inviteLoading,
    tenantUsers,
    loading,
    error,
    fetchLoginActivity,
    updateTenantRole,
    createTenantRole,
    roleLoading,
    roleError,
    roleSuccess,
  } = useTenantStore();

  const { user } = useAuthStore();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);

  const resources = ["conversations", "messages", "reports", "users"];
  const actions = ["read", "update", "delete", "write"];

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  // 🔹 Filters
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [timeRangeFilter, setTimeRangeFilter] = useState<string>("");

  // Fetch tenant users on component mount
  useEffect(() => {
    fetchLoginActivity().catch((err) => {
      console.error("Failed to fetch tenant users:", err);
      toast.error("Failed to load tenant users.");
    });
  }, [fetchLoginActivity]);

  // Transform tenant users data to table shape
  const transformedTenantUsers: TenantUserRow[] = useMemo(() => {
    if (!tenantUsers || tenantUsers.length === 0) return [];

    return tenantUsers.map((user: any) => ({
      id: user.id,
      name:
        user.name ||
        user.fullName ||
        `${user.firstName} ${user.lastName}`.trim() ||
        "N/A",
      email: user.email || "N/A",
      phoneNumber: user.phoneNumber || user.phone || "N/A",
      role: user.role?.name || user.userRole || "Member",
      roleId: user.role?.id, // 🔹 capture UUID here
      dateJoined:
        user.dateJoined || user.createdAt
          ? new Date(user.dateJoined || user.createdAt).toLocaleDateString(
              "en-US",
            )
          : new Date().toLocaleDateString("en-US"),
      status:
        user.status ||
        ((user.isActive ? "Active" : "Inactive") as
          | "Active"
          | "Pending"
          | "Inactive"),
    }));
  }, [tenantUsers]);

  // 🔹 Apply filters
  const filteredData = useMemo(() => {
    let users = transformedTenantUsers;

    if (statusFilter) {
      users = users.filter((u) => u.status === statusFilter);
    }
    if (roleFilter) {
      users = users.filter((u) => u.role === roleFilter);
    }
    if (timeRangeFilter) {
      const now = new Date();
      users = users.filter((u) => {
        const joinedDate = new Date(u.dateJoined);
        if (timeRangeFilter === "last7days") {
          return (
            now.getTime() - joinedDate.getTime() <= 7 * 24 * 60 * 60 * 1000
          );
        }
        if (timeRangeFilter === "last30days") {
          return (
            now.getTime() - joinedDate.getTime() <= 30 * 24 * 60 * 60 * 1000
          );
        }
        return true;
      });
    }
    return users;
  }, [transformedTenantUsers, statusFilter, roleFilter, timeRangeFilter]);

  // 🔹 Update Role API call
  const handleEdit = async (user: TenantUserRow) => {
    if (!user.roleId) {
      toast.error("This user does not have a valid role ID");
      return;
    }
    try {
      await updateTenantRole(user.roleId, {
        addPermissions: ["reports:export"],
        removePermissions: ["messages:update"],
      });
      toast.success(`Role updated for ${user.name}`);
      await fetchLoginActivity();
    } catch (err) {
      toast.error("Failed to update role");
      console.error(err);
    }
  };

  // 🔹 Create Role
  const handleCreateRole = async () => {
    if (!newRole.name || !newRole.description) {
      toast.error("Please fill in role name and description");
      return;
    }
    try {
      await createTenantRole({
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions,
      });
      toast.success("Role created successfully");
      setNewRole({ name: "", description: "", permissions: [] });
      setIsCreateRoleModalOpen(false);
    } catch {
      toast.error("Failed to create role");
    }
  };

  // 🔹 Invite Member
  const handleInvite = async () => {
    if (!newUser.email) {
      toast.error("Please enter an email before inviting.");
      return;
    }
    try {
      await inviteMember({ email: newUser.email, role: newUser.role });
      toast.success("Invitation sent to " + newUser.email);
      await fetchLoginActivity();
      setNewUser({ name: "", email: "", role: "" });
      setIsInviteModalOpen(false);
    } catch (error) {
      toast.error("Failed to send invitation");
    }
  };

  const handleRefreshData = async () => {
    try {
      await fetchLoginActivity();
      toast.success("Data refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh data");
    }
  };

  // 🔹 Table columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => (
          <span className="font-medium text-grey">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => (
          <span className="text-grey-medium">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("phoneNumber", {
        header: "Phone Number",
        cell: (info) => (
          <span className="text-grey-medium">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => (
          <span className="text-grey-medium">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("dateJoined", {
        header: "Date Joined",
        cell: (info) => (
          <span className="text-grey-medium">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                status === "Active"
                  ? "bg-green-100 text-green-800"
                  : status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Action",
        cell: (info) => (
          <div className="flex gap-2">
            <button
              className="p-1 hover:bg-gray-50 rounded transition-colors"
              onClick={() => handleEdit(info.row.original)}
            >
              <Edit size={16} className="text-grey-medium" />
            </button>
            <button
              className="p-1 hover:bg-gray-50 rounded transition-colors"
              onClick={() =>
                toast.error("Deleting users is not supported from this view")
              }
            >
              <Trash2 size={16} className="text-grey-medium" />
            </button>
          </div>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-grey">Settings</h1>
            <div className="flex items-center gap-2">
              <p className="text-primary font-medium">Role Management</p>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                API Data ({filteredData.length} users)
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Button
              label="Refresh"
              onClick={handleRefreshData}
              variant="secondary"
              IconLeft={
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
              }
              disabled={loading}
            />
            <Button
              label="Create Role"
              onClick={() => setIsCreateRoleModalOpen(true)}
              variant="primary"
              IconLeft={<Plus size={16} />}
            />
            <Button
              label="Invite Member"
              onClick={() => setIsInviteModalOpen(true)}
              variant="information"
              IconLeft={<Plus size={16} />}
            />
          </div>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">Error: {error}</p>
          </div>
        )}
        {/* Filters + Search */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-medium"
            />
            <Input
              type="text"
              placeholder="Search"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-grey border border-grey-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-grey-light rounded-lg px-3 py-2 text-grey-medium"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-grey-light rounded-lg px-3 py-2 text-grey-medium"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
            <option value="Moderator">Moderator</option>
          </select>
          <select
            value={timeRangeFilter}
            onChange={(e) => setTimeRangeFilter(e.target.value)}
            className="border border-grey-light rounded-lg px-3 py-2 text-grey-medium"
          >
            <option value="">All Time</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-grey-light overflow-hidden my-2">
        {loading && (
          <div className="p-6 text-center">
            <div className="inline-flex items-center gap-2 text-grey-medium">
              <RefreshCw size={16} className="animate-spin" />
              Loading tenant users...
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-grey-light">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-sm font-semibold text-grey tracking-wider cursor-pointer hover:bg-gray-50"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {{
                          asc: " ↑",
                          desc: " ↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                  variants={rowVariants}
                  custom={index}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && table.getRowModel().rows.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 text-sm">No users found</p>
          </div>
        )}
      </div>

      {/* Create Role Modal */}
      <AnimatePresence>
        {isCreateRoleModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={() => setIsCreateRoleModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-grey">Create Role</h2>
                <button
                  onClick={() => setIsCreateRoleModalOpen(false)}
                  className="text-grey-medium hover:text-grey-medium"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-grey-medium mb-2">
                  Role Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter role name"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-grey-medium mb-2">
                  Permissions
                </label>
                <div className="space-y-4">
                  {resources.map((res) => (
                    <div key={res}>
                      <p className="font-medium text-grey">{res}</p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {actions.map((act) => {
                          const value = `${res}:${act}`;
                          const isChecked = newRole.permissions.includes(value);
                          return (
                            <label
                              key={value}
                              className="flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  setNewRole((prev) => {
                                    if (isChecked) {
                                      return {
                                        ...prev,
                                        permissions: prev.permissions.filter(
                                          (p) => p !== value,
                                        ),
                                      };
                                    } else {
                                      return {
                                        ...prev,
                                        permissions: [
                                          ...prev.permissions,
                                          value,
                                        ],
                                      };
                                    }
                                  });
                                }}
                              />
                              <span className="text-sm text-grey-medium">
                                {act}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {roleError && (
                <p className="text-red-600 text-sm mb-3">{roleError}</p>
              )}
              {roleSuccess && (
                <p className="text-green-600 text-sm mb-3">{roleSuccess}</p>
              )}
              <div className="flex justify-end gap-3">
                <Button
                  label="Cancel"
                  onClick={() => setIsCreateRoleModalOpen(false)}
                  variant="secondary"
                />
                <Button
                  label={roleLoading ? "Creating..." : "Create Role"}
                  onClick={handleCreateRole}
                  variant="primary"
                  IconLeft={<Plus size={16} />}
                  disabled={roleLoading}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invite Modal */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={() => setIsInviteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-grey">
                  Invite Member
                </h2>
                <button
                  onClick={() => setIsInviteModalOpen(false)}
                  className="text-grey-medium hover:text-grey-medium"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-grey-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-grey-medium mb-2">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-grey-light rounded-lg"
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  label="Cancel"
                  onClick={() => setIsInviteModalOpen(false)}
                  variant="secondary"
                />
                <Button
                  label={inviteLoading ? "Inviting..." : "Invite"}
                  onClick={handleInvite}
                  variant="primary"
                  IconLeft={<Plus size={16} />}
                  disabled={inviteLoading}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RoleManagement;
