import { NavSection } from "@/types/dashboard.interface";

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Menu Items",
        href: "/admin/dashboard/menu-items",
        icon: "Hamburger",
        roles: ["ADMIN"],
      },
      {
        title: "Orders",
        href: "/admin/dashboard/orders",
        icon: "Stethoscope",
        roles: ["ADMIN"],
      },
    ],
  },
];
