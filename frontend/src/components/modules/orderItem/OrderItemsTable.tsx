"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Toggler from "./Toggler";
import ManagementTable from "@/components/shared/MangementTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

interface MenuItemsTableProps {
  menus: IMenuItem[];
  activeTab: string;
  handleToggle: (tab: "categories" | "menuItems") => void;
}

const MenuItemsTable = ({
  menus,
  activeTab,
  handleToggle,
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
      <ManagementPageHeader title="Order Mangement" />
      <ManagementTable
        data={menus}
        columns={menuItemsColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(admin) => admin.id!}
        emptyMessage="No admins found"
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
