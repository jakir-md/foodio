// "use client"
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";
import React from "react";

// export const dynamic = "force-dynamic";

const AdminDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
