import { NavSection } from "@/types/dashboard.interface";
import { Menu, ShoppingBag } from "lucide-react";

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Menu Items",
        href: "/admin/dashboard/menu-items",
        icon: Menu,
        roles: ["ADMIN"],
      },
      {
        title: "Orders",
        href: "/admin/dashboard/orders",
        icon: ShoppingBag,
        roles: ["ADMIN"],
      },
    ],
  },
];
