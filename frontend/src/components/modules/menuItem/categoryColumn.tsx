import { Column } from "@/components/shared/MangementTable";
import { Pencil, Trash2 } from "lucide-react";

export interface ICategory {
  id: string;
  name: string;
}

export const categoryColumns: Column<ICategory>[] = [
  {
    header: "Name",
    accessor: (item) => (
      <span className="text-sm font-medium text-[#13322B]">{item.name}</span>
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
