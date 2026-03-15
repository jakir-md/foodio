"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ManagementTable from "@/components/shared/MangementTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { IOrder, orderItemsColumns, OrderStatus } from "./orderItemsColumn";
import OrderDetailsModal from "./OrderDetailsModal";
import { updateOrderStatus } from "@/services/order/order.service";
import { toast } from "sonner";

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

  const handleStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const result = await updateOrderStatus({ orderId, status });
      if (result.success) {
        toast.success(result.message);
        handleRefresh();
      }
    } catch (error) {
      console.log("Error while handling order status", error);
    }
  };

  const handleView = (order: IOrder) => {
    setViewOrderDetails(order);
  };

  return (
    <>
      <ManagementPageHeader title="Order Mangement" />
      <ManagementTable
        data={orders}
        columns={orderItemsColumns}
        onView={handleView}
        getRowKey={(order) => order.id!}
        emptyMessage="No Order Found"
      />
      <OrderDetailsModal
        order={viewOrderDetails!}
        open={!!viewOrderDetails}
        onClose={() => setViewOrderDetails(null)}
      />
    </>
  );
};

export default OrderItemsTable;
