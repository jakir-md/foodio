export const dynamic = 'force-dynamic';
import OrderItemsTable from "@/components/modules/orderItem/OrderItemsTable";
import { getAllOrders } from "@/services/order/order.service";

export default async function OrderItems() {
  const orders = await getAllOrders();
  return (
    <div>
      <OrderItemsTable orders={orders.data} />
    </div>
  );
}
