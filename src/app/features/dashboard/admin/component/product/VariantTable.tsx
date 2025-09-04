import { Variant, VariantTableProps } from "@/app/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import GenericTable from "../table/GenericTable";
import { Edit2, Trash2 } from "lucide-react";
import { VisibilityCell } from "@/app/features/dashboard/admin/component/ui";

const VariantTable: React.FC<VariantTableProps> = ({ data }) => {
  const columns = useMemo<ColumnDef<Variant>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "visibility",
        header: "Visibility",
        cell: (info) => <VisibilityCell value={info.getValue<boolean>()} />, 
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: () => (
          <div className="flex gap-4">
            <button className="text-grey-light hover:text-information">
              <Edit2 size={24} />
            </button>
            <button className="text-grey-light hover:text-danger">
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

export default VariantTable;
