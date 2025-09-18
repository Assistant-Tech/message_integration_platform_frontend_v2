import { useEffect, useMemo } from "react";
import { useTenantStore } from "@/app/store/tenant.store";
import { ColumnDef } from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";
import { Button } from "@/app/components/ui";
import { GenericTable } from "@/app/features/dashboard/admin/component/table/GenericTable";
import { toast } from "sonner";

const TenantSettings = () => {
  const { tenantUsers, loading, fetchTenantUsers } = useTenantStore();

  const handleFetchUsers = () => {
    try {
      fetchTenantUsers();
      toast.success("Tenants Refreshed successfully");
    } catch (Error: any) {
      console.log("Error", Error);
    }
  };

  useEffect(() => {
    fetchTenantUsers();
  }, [fetchTenantUsers]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "user.name",
        header: "Name",
        cell: (info) => String(info.getValue()),
      },
      {
        accessorKey: "user.email",
        header: "Email",
        cell: (info) => String(info.getValue()),
      },
      {
        accessorKey: "role.name",
        header: "Role",
        cell: (info) => String(info.getValue()),
      },
      {
        accessorKey: "user.status",
        header: "Status",
        cell: (info) => {
          const value = String(info.getValue());
          return (
            <span
              className={`px-2 py-1 rounded text-xs ${
                value === "ONLINE"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: "user.joinedAt",
        header: "Joined At",
        cell: (info) =>
          new Date(String(info.getValue())).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
      },
    ],
    [],
  );

  return (
    <div className="p-6">
      {/* Header + Refresh Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tenant Users</h2>
        <Button
          label="Refresh"
          variant="primary"
          onClick={handleFetchUsers}
          disabled={loading}
          IconRight={
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
          }
        />
      </div>

      {/* GenericTable */}
      <GenericTable
        data={tenantUsers}
        columns={columns}
        emptyMessage={loading ? "Loading..." : "No users found"}
      />
    </div>
  );
};

export default TenantSettings;
