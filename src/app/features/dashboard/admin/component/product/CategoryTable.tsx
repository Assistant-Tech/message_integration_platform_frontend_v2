import { Category, CategoryTableProps } from "@/app/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import GenericTable from "../table/GenericTable";
import { VisibilityCell } from "@/app/features/dashboard/admin/component/ui";

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
        accessorKey: "action",
        header: "Action",
        cell: () => (
          <button className="text-information hover:underline">Edit</button>
        ),
      },
    ],
    [],
  );

  return <GenericTable columns={columns} data={data} />;
};

export default CategoryTable;
