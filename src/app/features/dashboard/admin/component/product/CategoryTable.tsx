import { Category } from "@/app/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import GenericTable from "../table/GenericTable";
import { VisibilityCell } from "@/app/features/dashboard/admin/component/ui";
import { Edit, Trash2 } from "lucide-react";

const CategoryTable: React.FC<any> = ({ data, onDelete, onEdit }) => {
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
        accessorKey: "action",
        header: "Action",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <button
              className="text-grey-medium hover:underline"
              onClick={() => onEdit(info.row.original.id)}
            >
              <Edit size={24} />
            </button>
            <button
              className="text-danger hover:underline"
              onClick={() => onDelete(info.row.original.id)}
            >
              <Trash2 size={24} />
            </button>
          </div>
        ),
      },
    ],
    [onDelete, onEdit],
  );

  return <GenericTable columns={columns} data={data} />;
};

export default CategoryTable;
