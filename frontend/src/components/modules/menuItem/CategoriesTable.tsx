"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Toggler from "./Toggler";
import ManagementTable from "@/components/shared/MangementTable";
import { IMenuItem } from "./menuItemsColumn";
import { categoryColumns, ICategory } from "./categoryColumn";
import AddNewCategoryModal from "./AddNewCategoryModal";
import {
  addNewCategory,
  deleteCategory,
} from "@/services/category/category.service";
import { toast } from "sonner";

interface CategoryTableProps {
  menus: ICategory[];
  activeTab: string;
  handleToggle: (tab: "categories" | "menuItems") => void;
}

const CategoryTable = ({
  menus,
  activeTab,
  handleToggle,
}: CategoryTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [categoryName, setCategoryName] = useState("");
  const [deletingCateogry, setDeletingCategory] = useState<ICategory | null>(
    null,
  );

  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [addCategory, setAddCategory] = useState(false);
  const [deleteCat, setDeleteCategory] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("add cat hit");
    try {
      const result = await addNewCategory(categoryName);
      console.log({ result });
      if (result.success) {
        toast.success("Category Added Successfully.");
        setAddCategory(false);
        handleRefresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Category addition Failed.");
      console.log("Category addition errror", error);
    }
  };
  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
  };

  const handleDelete = (category: ICategory) => {
    setDeleteCategory(true);
    setDeletingCategory(category);
  };

  const confirmDelete = async () => {
    if (!deletingCateogry) return;
    const result = await deleteCategory(deletingCateogry.id!);

    if (result.success) {
      toast.success(result.message || "Category deleted successfully");
      setDeletingCategory(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Category to delete Menu");
    }
  };

  return (
    <>
      <Toggler
        handleOnclick={() => setAddCategory(true)}
        activeTab={activeTab}
        handleToggle={handleToggle}
        title="Category"
      />

      <ManagementTable
        data={menus}
        columns={categoryColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(admin) => admin.id!}
        emptyMessage="No Category Found"
      />

      <AddNewCategoryModal
        open={addCategory}
        onClose={() => setAddCategory(false)}
        onSubmit={handleSubmit}
        setCategoryName={setCategoryName}
        categoryName={categoryName}
      />

      <DeleteConfirmationDialog
        open={deleteCat}
        onOpenChange={() => setDeleteCategory(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        description={`Are you sure you want to delete ${deletingCateogry?.name}? This action cannot be undone.`}
      />
    </>
  );
};

export default CategoryTable;
