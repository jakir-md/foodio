import React from "react";

type OrderStatus = "PENDING" | "PREPARING" | "READY" | "COMPLETED";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: OrderStatus;
  address: string;
  items: OrderItem[];
}

export const STEPS: OrderStatus[] = [
  "PENDING",
  "PREPARING",
  "READY",
  "COMPLETED",
];

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusConfig: Record<
    OrderStatus,
    { bg: string; text: string; label: string }
  > = {
    PENDING: {
      bg: "bg-[#FFF8EB]",
      text: "text-[#B87503]",
      label: "Pending",
    },
    PREPARING: {
      bg: "bg-[#EBF5FF]",
      text: "text-[#1E40AF]",
      label: "Preparing",
    },
    READY: {
      bg: "bg-[#F4EEFF]",
      text: "text-[#6B21A8]",
      label: "Ready",
    },
    COMPLETED: {
      bg: "bg-[#E5F5E8]",
      text: "text-[#13322B]",
      label: "Completed",
    },
  };

  const config = statusConfig[status] || statusConfig.PENDING;

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
};

const OrderStepper = ({ currentStatus }: { currentStatus: OrderStatus }) => {
  const activeIndex = STEPS.indexOf(currentStatus);

  return (
    <div className="w-full max-w-lg mx-auto mt-12 mb-4 relative">
      <div className="absolute left-0 top-[5px] right-0 h-[2px] bg-gray-200" />

      <div
        className="absolute left-0 top-[5px] h-[2px] bg-[#13322B] transition-all duration-500 ease-in-out"
        style={{ width: `${(activeIndex / (STEPS.length - 1)) * 100}%` }}
      />

      <div className="relative z-10 flex justify-between items-center">
        {STEPS.map((step, index) => {
          const isActive = index <= activeIndex;
          return (
            <div key={step} className="flex flex-col items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                  isActive ? "bg-[#13322B]" : "bg-gray-200"
                }`}
              />
              <span
                className={`text-[9px] sm:text-[10px] font-bold tracking-wider ${
                  isActive ? "text-[#13322B]" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className="bg-[#FCFBF8] border border-gray-100 rounded-xl p-6 sm:p-8 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
        <div>
          <h2 className="text-lg font-bold text-[#13322B]">
            Order #{order.id}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Placed on {order.createdAt}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-lg font-bold text-[#13322B]">
            ${order.totalAmount.toFixed(2)}
          </p>
          <StatusBadge status={order.status} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-4">
          ITEMS
        </h3>
        <div className="flex flex-col gap-3">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-gray-700">
                {item.quantity}x {item.name}
              </span>
              <span className="text-gray-500">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200 mb-4" />

      <div className="flex justify-end mb-6">
        <p className="text-sm font-bold text-[#13322B]">
          Total Amount :{" "}
          <span className="text-base">${order.totalAmount.toFixed(2)}</span>
        </p>
      </div>

      <div className="w-full h-[1px] bg-gray-200 mb-6" />

      <p className="text-xs text-gray-500 mb-8">
        <span className="font-semibold text-gray-700">Delivering to:</span>{" "}
        {order.address}
      </p>

      <OrderStepper currentStatus={order.status} />
    </div>
  );
};

interface MyOrderProps {
  orders: Order[];
}
export default function MyOrdersPage({ orders }: MyOrderProps) {
  return (
    <main className="max-w-360 mx-auto px-6 md:px-12 pt-32 pb-24 min-h-screen">
      <h1 className="text-3xl font-serif font-bold text-[#13322B] mb-10">
        My Orders
      </h1>

      <div className="flex flex-col gap-2">
        {orders && orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </main>
  );
}