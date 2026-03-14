"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Toggler from "./Toggler";
import ManagementTable from "@/components/shared/MangementTable";
import { IMenuItem, menuItemsColumns } from "./menuItemsColumn";
import AddNewItemModal from "./AddNewItemModal";
import { ICategory } from "./categoryColumn";

interface MenuItemsTableProps {
  menus: IMenuItem[];
  activeTab: string;
  handleToggle: (tab: "categories" | "menuItems") => void;
  categories: ICategory[];
}

const MenuItemsTable = ({
  menus,
  activeTab,
  handleToggle,
  categories,
}: MenuItemsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingMenu, setDeletingMenu] = useState<IMenuItem | null>(null);
  const [editingMenu, setEditingMenu] = useState<IMenuItem | null>(null);
  const [addMenu, setAddMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(true);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleEdit = (admin: IMenuItem) => {
    setEditingMenu(admin);
  };

  const handleDelete = (admin: IMenuItem) => {
    setDeletingMenu(admin);
  };

  const confirmDelete = async () => {
    if (!deletingMenu) return;

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
        handleOnclick={() => setAddMenu(true)}
        activeTab={activeTab}
        handleToggle={handleToggle}
        title="Item"
      />
      <ManagementTable
        data={menus}
        columns={menuItemsColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(admin) => admin.id!}
        emptyMessage="No menu items found"
      />

      {/* Edit Admin Form Dialog */}
      <AddNewItemModal
        open={addMenu}
        onClose={() => setAddMenu(false)}
        categories={categories}
        onSuccess={() => {
          handleRefresh();
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingMenu}
        onOpenChange={(open) => !open && setDeletingMenu(null)}
        onConfirm={confirmDelete}
        title="Delete Menu"
        description={`Are you sure you want to delete ${deletingMenu?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default MenuItemsTable;
