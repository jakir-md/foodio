"use client";

import { Check, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function MenuItemSortPopover() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const selectedSort = searchParams.get("sort") || null;
  const handleSortChange = (newSort: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSort) {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-1.5 bg-[#13322B]/5 text-[#13322B] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#13322B]/10 transition-colors shrink-0"
          disabled={isPending}
        >
          Sort
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-60 p-0 rounded-2xl shadow-xl bg-white border border-gray-100/50"
        align="end"
      >
        <div className="flex items-center justify-between p-4 pb-2.5">
          <span className="text-lg font-bold text-[#13322B]">Sort by</span>
          <Button
            variant="link"
            size="sm"
            onClick={() => handleSortChange(null)}
            disabled={!selectedSort}
            className="p-0 h-auto text-sm text-gray-400 hover:text-gray-500 font-medium"
          >
            Clear
          </Button>
        </div>
        <div className="border-t border-gray-100" />

        <div className="p-1 space-y-0.5">
          <SortItem
            label="Availability"
            isSelected={selectedSort === "availability"}
            onClick={() => handleSortChange("availability")}
          />
          <SortItem
            label="Price"
            isSelected={selectedSort === "price"}
            onClick={() => handleSortChange("price")}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface SortItemProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const SortItem = ({ label, isSelected, onClick }: SortItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors",
        isSelected ? "bg-[#F1F5F9]" : "hover:bg-gray-50 text-gray-700",
      )}
    >
      <span
        className={cn(
          "font-medium text-sm",
          isSelected ? "text-[#13322B]" : "text-gray-700",
        )}
      >
        {label}
      </span>
      {isSelected ? (
        <div className="w-5 h-5 bg-[#13322B] rounded-full flex items-center justify-center p-0.5">
          <Check className="w-full h-full text-white" />
        </div>
      ) : (
        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
      )}
    </div>
  );
};
