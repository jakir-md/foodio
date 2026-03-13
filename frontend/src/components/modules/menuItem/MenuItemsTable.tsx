"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Toggler from "./Toggler";
import ManagementTable from "@/components/shared/MangementTable";
import { IMenuItem, menuItemsColumns } from "./menuItemsColumn";
import AddNewItemModal from "./AddNewItemModal";

interface MenuItemsTableProps {
  menus: IMenuItem[];
}

const MenuItemsTable = ({ menus }: MenuItemsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingMenu, setDeletingMenu] = useState<IMenuItem | null>(null);
  const [editingMenu, setEditingMenu] = useState<IMenuItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
      <Toggler />
      <ManagementTable
        data={menus}
        columns={menuItemsColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(admin) => admin.id!}
        emptyMessage="No admins found"
      />

      {/* Edit Admin Form Dialog */}
      <AddNewItemModal
        open={!!editingAdmin}
        onClose={() => setEditingAdmin(null)}
        admin={editingAdmin!}
        onSuccess={() => {
          setEditingAdmin(null);
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
