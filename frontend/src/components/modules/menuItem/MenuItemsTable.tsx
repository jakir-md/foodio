"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Toggler from "./Toggler";
import ManagementTable from "@/components/shared/MangementTable";
import { IMenuItem, menuItemsColumns } from "./menuItemsColumn";
import AddNewItemModal from "./AddNewItemModal";
import { ICategory } from "./categoryColumn";
import EditMenuItemModal from "./EditMenuItemModal";
import { toast } from "sonner";
import { deleteMenu } from "@/services/menu/menu.service";
import TablePagination from "@/components/shared/TablePagination";
import { IMeta } from "./MenuItemPage";

interface MenuItemsTableProps {
  menus: IMenuItem[];
  activeTab: string;
  handleToggle: (tab: "categories" | "menuItems") => void;
  categories: ICategory[];
  meta: IMeta;
}

const MenuItemsTable = ({
  menus,
  activeTab,
  handleToggle,
  categories,
  meta,
}: MenuItemsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingMenu, setDeletingMenu] = useState<IMenuItem | null>(null);
  const [editingMenu, setEditingMenu] = useState<IMenuItem | null>(null);
  const [addMenu, setAddMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleEdit = (item: IMenuItem) => {
    setEditingMenu(item);
    setIsEditing(true);
  };

  const handleDelete = (item: IMenuItem) => {
    setDeletingMenu(item);
  };

  const confirmDelete = async () => {
    if (!deletingMenu) return;
    setDeletingMenu(null);
    try {
      const toastId = toast.loading("Deleting Menu..");
      const result = await deleteMenu(deletingMenu.id!);
      if (result.success) {
        toast.success(result.message || "Menu deleted successfully", {
          id: toastId,
        });
        setDeletingMenu(null);
        handleRefresh();
      } else {
        toast.error(result.message || "Failed to delete Menu", { id: toastId });
      }
    } catch (error) {
      console.log("Menu Deletion Error", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <Toggler
          handleOnclick={() => setAddMenu(true)}
          activeTab={activeTab}
          handleToggle={handleToggle}
          title="Item"
        />

        <div className="min-h-60">
          <ManagementTable
            data={menus}
            columns={menuItemsColumns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getRowKey={(admin) => admin.id!}
            emptyMessage="No menu items found"
          />
        </div>

        <TablePagination
          currentPage={meta?.page || 1}
          totalPages={meta?.totalPages || 1}
        />
      </div>

      <AddNewItemModal
        open={addMenu}
        onClose={() => setAddMenu(false)}
        categories={categories}
        onSuccess={() => {
          handleRefresh();
        }}
      />
      <DeleteConfirmationDialog
        open={!!deletingMenu}
        onOpenChange={(open) => !open && setDeletingMenu(null)}
        onConfirm={confirmDelete}
        title="Delete Menu"
        description={`Are you sure you want to delete ${deletingMenu?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
      <EditMenuItemModal
        initialData={editingMenu}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        categories={categories}
        onRefresh={handleRefresh}
      />
    </>
  );
};

export default MenuItemsTable;
