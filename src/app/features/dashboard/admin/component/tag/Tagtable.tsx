import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import GenericTable from "../table/GenericTable";

interface Tag {
  name: string;
  color: string;
  createdOn: string;
  visibility: boolean;
}

interface TagTableProps {
  data: Tag[];
}

const TagTable: React.FC<TagTableProps> = ({ data }) => {
  const columns = useMemo<ColumnDef<Tag>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "color",
        header: "Color",
        cell: (info) => (
          <div
            className="w-5 h-5 rounded"
            style={{ backgroundColor: info.getValue() as string }}
          />
        ),
      },
      {
        accessorKey: "createdOn",
        header: "Created On",
      },
      {
        accessorKey: "visibility",
        header: "Visibility",
        cell: (info) => (
          <input
            type="checkbox"
            checked={info.getValue() as boolean}
            readOnly
          />
        ),
      },
      {
        id: "actions",
        header: "Action",
        cell: () => (
          <div className="flex gap-2">
            <Pencil className="cursor-pointer text-grey-medium" />
            <Trash2 className="cursor-pointer text-danger" />
          </div>
        ),
      },
    ],
    [],
  );

  return <GenericTable columns={columns} data={data} />;
};

export default TagTable;
