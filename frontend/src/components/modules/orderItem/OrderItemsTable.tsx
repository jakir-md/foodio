"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ManagementTable from "@/components/shared/MangementTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { IOrder, orderItemsColumns, OrderStatus } from "./orderItemsColumn";
import OrderDetailsModal from "./OrderDetailsModal";

interface MenuItemsTableProps {
  orders: IOrder[];
}

const OrderItemsTable = ({ orders }: MenuItemsTableProps) => {
  console.log({ orders });
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [viewOrderDetails, setViewOrderDetails] = useState<IOrder | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleStatus = (orderId: string, status: OrderStatus) => {
    try {
    } catch (error) {}
  };

  const handleView = (order: IOrder) => {
    setViewOrderDetails(order);
  };

  const confirmDelete = async () => {
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
        data={orders}
        columns={orderItemsColumns}
        onView={handleView}
        // onDelete={handleDelete}
        getRowKey={(order) => order.id!}
        emptyMessage="No Order Found"
      />

      {/* Delete Confirmation Dialog */}
      {/* <DeleteConfirmationDialog
        open={!!deletingMenu}
        onOpenChange={(open) => !open && setDeletingMenu(null)}
        onConfirm={confirmDelete}
        title="Delete Menu"
        description={`Are you sure you want to delete ${deletingMenu?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      /> */}

      <OrderDetailsModal
        order={viewOrderDetails!}
        open={false}
        onClose={() => setViewOrderDetails(null)}
      />
    </>
  );
};

export default OrderItemsTable;
