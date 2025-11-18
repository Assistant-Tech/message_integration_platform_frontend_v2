import { Product, ProductTableProps, Status } from "@/app/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import GenericTable from "../table/GenericTable";
import { VisibilityCell } from "@/app/features/dashboard/admin/component/ui";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/app/components/ui";

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  // const [selected, setSelected] = useState<Record<string, boolean>>({});

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "product_id",
        header: "Id",
        cell: (info) => {
          // const row = info.row.original;
          return (
            <div className="flex items-center gap-3">
              {/* checker // checklist */}
              {/*<label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={!!selected[row.id]}
                  onChange={() =>
                    setSelected((prev) => ({
                      ...prev,
                      [row.id]: !prev[row.id],
                    }))
                  }
                />

                <div className="w-5 h-5 rounded border border-gray-300 peer-checked:bg-primary peer-checked:border-primary grid place-items-center">
                  {selected && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>
              </label>*/}
              {/* PROD-ID */}
              <span> {info.getValue() as string}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="bg-grey-light w-16 h-16 flex items-center justify-center overflow-hidden rounded-md">
                <img
                  src={row.image}
                  alt={row.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-medium">{row.name}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => <span>${info.getValue() as number}</span>,
      },
      {
        accessorKey: "SKU",
        header: "SKU",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "variants",
        header: "Variants",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "visibility",
        header: "Visibility",
        cell: (info) => <VisibilityCell value={info.getValue<boolean>()} />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const value = info.getValue() as Status;

          const getStatusStyle = (status: Status) => {
            switch (status) {
              case "Pending":
                return "bg-warning text-black";
              case "Success":
                return "bg-primary text-white";
              case "Failed":
                return "bg-danger text-white";
              case "In Progress":
                return "bg-information text-white";
              default:
                return "bg-grey-medium text-white";
            }
          };

          return (
            <span
              className={`capitalize px-3 py-1 rounded-lg text-sm ${getStatusStyle(
                value,
              )}`}
            >
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: () => (
          <div className="flex items-center justify-start gap-4">
            <Button variant="none" IconLeft={<Edit size={24} color="grey" />} />
            <Button
              variant="none"
              IconLeft={<Trash2 size={24} color="red" />}
            />
          </div>
        ),
      },
    ],
    [],
  );

  return <GenericTable columns={columns} data={data} />;
};

export default ProductTable;
