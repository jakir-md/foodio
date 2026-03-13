import { adminNavItems } from "@/lib/navItems.config";
import { NavSection } from "@/types/dashboard.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
  const navItems: NavSection[] = adminNavItems;
  const dashboardHome = "/admin/dashboard";

  return (
    <DashboardSidebarContent
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
