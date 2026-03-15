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
];