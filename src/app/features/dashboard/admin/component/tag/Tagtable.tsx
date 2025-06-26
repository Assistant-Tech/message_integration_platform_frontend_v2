// components/TagTable.tsx
"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border border-grey-light rounded-lg overflow-x-auto">
      <table className="min-w-full text-left ">
        <thead className="bg-base-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="label-bold-14 text-grey px-6 py-4"
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-grey-light">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-base-white">
              {row.getVisibleCells().map((cell) => (
                <td
                  className="px-6 py-4   label-regular-14 text-grey-medium"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TagTable;
