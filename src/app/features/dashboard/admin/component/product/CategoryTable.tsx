import { Category, CategoryTableProps } from "@/app/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import GenericTable from "../table/GenericTable";
import { VisibilityCell } from "@/app/features/dashboard/admin/component/ui";
import { Edit, Eye, Trash2 } from "lucide-react";

const CategoryTable: React.FC<CategoryTableProps> = ({ data }) => {
  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "products",
        header: "Products",
        cell: (info) => <span>{info.getValue() as number}</span>,
      },
      {
        accessorKey: "visibility",
        header: "Visibility",
        cell: (info) => <VisibilityCell value={info.getValue<boolean>()} />,
      },
      {
        // Handle view / edit / delete left to be done
        accessorKey: "action",
        header: "Action",
        cell: () => (
          <div className="flex items-center gap-2">
            <button className="text-grey-medium hover:underline">
              <Eye size={24} />
            </button>
            <button className="text-information hover:underline">
              <Edit size={24} />
            </button>
            <button className="text-danger hover:underline">
              <Trash2 size={24} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return <GenericTable columns={columns} data={data} />;
};

export default CategoryTable;
