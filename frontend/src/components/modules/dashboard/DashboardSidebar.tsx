"use client"
import { adminNavItems } from "@/lib/navItems.config";
import { NavSection } from "@/types/dashboard.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar =() => {
  const navItems: NavSection[] = adminNavItems;
  const dashboardHome = "/";

  return (
    <DashboardSidebarContent
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;