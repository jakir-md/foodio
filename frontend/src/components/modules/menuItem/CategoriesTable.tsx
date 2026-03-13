"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Toggler from "./Toggler";
import ManagementTable from "@/components/shared/MangementTable";
import { IMenuItem } from "./menuItemsColumn";
import { categoryColumns, ICategory } from "./categoryColumn";
import AddNewCategoryModal from "./AddNewCategoryModal";

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
  const [deletingCateogry, setDeletingCategory] = useState<ICategory | null>(
    null,
  );
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [addCategory, setAddCategory] = useState(false);
  const [isDeleting, setIsDeleting] = useState(true);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleEdit = (admin: IMenuItem) => {
    setEditingCategory(admin);
  };

  const handleDelete = (admin: IMenuItem) => {
    setDeletingCategory(admin);
  };

  const confirmDelete = async () => {
    if (!deletingCateogry) return;

    // setIsDeleting(true);
    // const result = await softDeleteAdmin(deletingAdmin.id!);
    // setIsDeleting(false);

    // if (result.success) {
    //   toast.success(result.message || "Menu deleted successfully");
    //   setDeletingMenu(null);
    //   handleRefresh();
    // } else {
    //   toast.error(result.message || "Failed to delete Menu");
    // }
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
        // onEdit={handleEdit}
        // onDelete={handleDelete}
        getRowKey={(admin) => admin.id!}
        emptyMessage="No Category Found"
      />

      {/* Edit Admin Form Dialog */}
      <AddNewCategoryModal
        open={addCategory}
        onClose={() => setAddCategory(false)}
        // admin={editingAdmin!}
        // onSuccess={() => {
        //   setEditingAdmin(null);
        //   handleRefresh();
        // }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingCateogry}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        onConfirm={confirmDelete}
        title="Delete Category"
        description={`Are you sure you want to delete ${deletingCateogry?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default CategoryTable;
