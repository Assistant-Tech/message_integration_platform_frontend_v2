import { useState, useMemo } from "react";
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
import { Search, Plus, Filter, Edit, Trash2, X } from "lucide-react";
import { Input } from "@/app/components/ui";

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  dateJoined: string;
  status: "Active" | "Pending" | "Inactive";
}

const staticData: User[] = [
  {
    id: 1,
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    phoneNumber: "9841000000",
    role: "Admin",
    dateJoined: "06/17/2025",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Davis",
    email: "sarahd@gmail.com",
    phoneNumber: "9845000000",
    role: "Member",
    dateJoined: "06/17/2025",
    status: "Pending",
  },
  {
    id: 3,
    name: "John Smith",
    email: "johns@gmail.com",
    phoneNumber: "9842000000",
    role: "Member",
    dateJoined: "06/18/2025",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily White",
    email: "emilyw@gmail.com",
    phoneNumber: "9843000000",
    role: "Member",
    dateJoined: "06/18/2025",
    status: "Active",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "mikeb@gmail.com",
    phoneNumber: "9844000000",
    role: "Member",
    dateJoined: "06/19/2025",
    status: "Active",
  },
  {
    id: 6,
    name: "Jessica Miller",
    email: "jessicam@gmail.com",
    phoneNumber: "9846000000",
    role: "Member",
    dateJoined: "06/19/2025",
    status: "Pending",
  },
  {
    id: 7,
    name: "David Garcia",
    email: "davidg@gmail.com",
    phoneNumber: "9847000000",
    role: "Admin",
    dateJoined: "06/20/2025",
    status: "Active",
  },
];

const columnHelper = createColumnHelper<User>();

const RoleManagement = () => {
  const [data, setData] = useState(staticData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
  });

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
                    : "bg-base-white text-gray-800"
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
              className="p-1 hover:bg-base-white rounded transition-colors"
              onClick={() => handleEdit(info.row.original)}
            >
              <Edit size={16} className="text-grey-medium" />
            </button>
            <button
              className="p-1 hover:bg-base-white rounded transition-colors"
              onClick={() => handleDelete(info.row.original.id)}
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
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (userId: number) => {
    setData(data.filter((user) => user.id !== userId));
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const user: User = {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
        phoneNumber: "N/A",
        role: newUser.role,
        dateJoined: new Date().toLocaleDateString("en-US"),
        status: "Pending",
      };
      setData([...data, user]);
      setNewUser({ name: "", email: "", role: "" });
      setIsAddModalOpen(false);
    }
  };

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
      className="p-6 bg-base-white min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-grey">Settings</h1>
            <p className="text-primary font-medium">Role Management</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Users
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between gap-4 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-medium"
            />
            <Input
              type="text"
              placeholder="Search"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-grey border border-grey-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-grey-medium">Sort By:</span>
            <select className="border border-grey-light rounded-lg px-3 py-2 text-grey-medium">
              <option>Date . new to old</option>
              <option>Date . old to new</option>
              <option>Name . A to Z</option>
              <option>Name . Z to A</option>
            </select>
            <button className="border border-grey-light rounded-lg px-4 py-2 flex items-center gap-2 text-grey-medium hover:bg-base-white transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-grey-light overflow-hidden my-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-base-white border-b border-grey-light">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-sm font-semibold text-grey tracking-wider cursor-pointer hover:bg-base-white"
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
            <tbody className="divide-y divide-base-white">
              {table.getRowModel().rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  className="hover:bg-base-white transition-colors duration-200"
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

        {/* Empty state */}
        {table.getRowModel().rows.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-base-white0 text-sm">No users found</p>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-grey">Add Users</h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-grey-medium hover:text-grey-medium"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-grey-medium mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter full name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-grey-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
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
                    className="w-full px-3 py-2 border border-grey-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block body-regular-16 text-grey-medium mb-2">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-grey-light block body-regular-16 text-grey-medium mb-2 rounded-lg"
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setNewUser({ name: "", email: "", role: "" })}
                className="text-primary flex items-center gap-2 mb-6"
              >
                <Plus size={16} />
                Add New User
              </button>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-2 bg-grey-metext-grey-medium text-white rounded-lg hover:bg-grey-metext-grey-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RoleManagement;
