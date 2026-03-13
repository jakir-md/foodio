import { IOrder } from "@/components/modules/orderItem/orderItemsColumn";
import OrderItemsTable from "@/components/modules/orderItem/OrderItemsTable";

export default function OrderItems() {
  const DUMMY_ORDERS: IOrder[] = [
    {
      id: "5b331ea1-49af-422e-ba46-4e94ca95294c",
      date: "Dec 12, 4:33 PM",
      customerName: "John Doe",
      total: 24.0,
      address: "House:23, Road:23, Jamaica, USA",
      items: [
        {
          quantity: 1,
          price: 24.0,
          name: "Pan-Seared Scallops",
        },
      ],
      status: "Pending",
    },
    {
      id: "8c729fe2-11bc-483d-ca92-2b34bc98124d",
      date: "Dec 12, 5:15 PM",
      customerName: "Jane Smith",
      total: 56.0,
      address: "Apt 4B, 123 Maple St, New York, USA",
      items: [
        {
          quantity: 1,
          price: 32.0,
          name: "Citrus Swirl Delights",
        },
        {
          quantity: 1,
          price: 24.0,
          name: "Pan-Seared Scallops",
        },
      ],
      status: "Preparing",
    },
    {
      id: "3a218ea1-99af-422e-ba46-4e94ca95294a",
      date: "Dec 12, 6:00 PM",
      customerName: "Alice Johnson",
      total: 45.0,
      address: "789 Oak Ave, Los Angeles, USA",
      items: [
        {
          quantity: 1,
          price: 45.0,
          name: "Creamy Garlic Shrimp Pasta",
        },
      ],
      status: "Ready",
    },
    {
      id: "9b331ea1-49af-422e-ba46-4e94ca95294f",
      date: "Dec 12, 6:30 PM",
      customerName: "Michael Scott",
      total: 34.0,
      address: "1725 Slough Ave, Scranton, USA",
      items: [
        {
          quantity: 1,
          price: 18.0,
          name: "Mediterranean Olive Medley",
        },
        {
          quantity: 1,
          price: 16.0,
          name: "Herb-Roasted Chicken Bowl",
        },
      ],
      status: "Completed",
    },
    {
      id: "2c118ea1-99af-422e-ba46-4e94ca95294b",
      date: "Dec 12, 7:15 PM",
      customerName: "David Wallace",
      total: 64.0,
      address: "123 Corporate Dr, New York, USA",
      items: [
        {
          quantity: 2,
          price: 32.0,
          name: "Citrus Swirl Delights",
        },
      ],
      status: "Pending",
    },
  ];
  return (
    <div>
      <OrderItemsTable orders={DUMMY_ORDERS} />
    </div>
  );
}