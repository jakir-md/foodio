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
  const [viewOrderDetails, setViewOrderDetails] = useState<IOrder | null>(null);
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
      <div className="mb-10"></div>
      <OrderDetailsModal
        order={viewOrderDetails!}
        open={!!viewOrderDetails}
        onClose={() => setViewOrderDetails(null)}
      />
    </>
  );
};

export default OrderItemsTable;
