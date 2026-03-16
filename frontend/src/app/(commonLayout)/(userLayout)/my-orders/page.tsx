export const dynamic = 'force-dynamic';
import MyOrdersPage from "@/components/modules/Home/Orders";
import { getMyOrders } from "@/services/order/order.service";

export default async function MyOrders() {
  const orders = await getMyOrders();
  return <MyOrdersPage orders={orders.data} />;
}