import { Column } from "@/components/shared/MangementTable";
import { Pencil, Trash2 } from "lucide-react";

export interface IMenuItem {
  id: string;
  name: string;
  category: { name: string };
  price: number;
  isAvailable: boolean;
}

export const menuItemsColumns: Column<IMenuItem>[] = [
  {
    header: "Name",
    accessor: (item) => (
      <span className="text-sm font-medium text-[#13322B]">{item.name}</span>
    ),
  },
  {
    header: "Category",
    accessor: (item) => (
      <span className="text-sm text-gray-700">{item.category.name}</span>
    ),
  },
  {
    header: "Price",
    accessor: (item) => (
      <span className="text-sm text-gray-700">${item.price.toFixed(2)}</span>
    ),
  },
  {
    header: "Status",
    accessor: (item) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          item.isAvailable
            ? "bg-[#E8F5E9] text-[#2E7D32]"
            : "bg-red-50 text-red-600"
        }`}
      >
        {item.isAvailable ? "Available" : "Unavailable"}
      </span>
    ),
  },
  {
    header: "Actions",
    accessor: (item) => (
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Pencil className="w-4 h-4" />
        </button>
        <button className="text-red-400 hover:text-red-600 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];
