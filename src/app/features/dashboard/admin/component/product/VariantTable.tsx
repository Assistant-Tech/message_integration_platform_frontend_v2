import { Variant, VariantTableProps } from "@/app/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import GenericTable from "../table/GenericTable";
import { Check, Edit2, Trash2 } from "lucide-react";

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
        cell: (info) => {
          const initial = info.getValue<boolean>();
          const [enabled, setEnabled] = useState(initial);

          return (
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={enabled}
                onChange={() => setEnabled((prev) => !prev)}
              />
              <div className="w-5 h-5 rounded border border-gray-300 peer-checked:bg-primary peer-checked:border-primary grid place-items-center">
                {enabled && (
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                )}
              </div>
            </label>
          );
        },
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
