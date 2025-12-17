import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import GenericTable from "../table/GenericTable";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { Variant } from "@/app/types/variants.types";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";
import { useAuthStore } from "@/app/store/auth.store";

const VariantTable: React.FC<any> = ({ data }) => {
  const tenantSlug = useAuthStore((s) => s.tenantSlug);
  const navigate = useNavigate();
  const handleRedirectToInventory = () => {
    navigate(`/${tenantSlug}/admin/${APP_ROUTES.ADMIN.PRODUCTS_INVENTORY}`);
  };
  const columns = useMemo<ColumnDef<Variant>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Variant Id",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "title",
        header: "Name",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "sku",
        header: "SKU",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "inventory.stock",
        header: "Stock",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "inventory.id",
        header: "Inventory Id",
        cell: (info) => {
          const fullId = info.getValue() as string;
          const maxLeng = 8;
          let displayValue;
          if (maxLeng <= fullId.split().length) {
            displayValue = fullId;
          } else {
            displayValue = fullId.slice(0, maxLeng) + "...";
          }
          return <span>{displayValue} </span>;
        },
      },
      {
        accessorKey: "inventory.lowStock",
        header: "Inventory Details",
        cell: () => (
          <button
            onClick={handleRedirectToInventory}
            className="text-primary hover:text-primary-dark cursor-pointer underline"
          >
            View Inventory
            {/* <Eye size={20} /> */}
          </button>
        ),
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: () => (
          <div className="flex gap-4">
            <button className="text-grey-medium hover:text-grey cursor-pointer">
              <Eye size={20} />
            </button>
            <button className="text-information hover:text-information-dark cursor-pointer">
              <Edit2 size={20} />
            </button>
            <button className="text-danger hover:text-danger-dark cursor-pointer">
              <Trash2 size={20} />
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
