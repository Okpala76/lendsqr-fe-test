import { DashboardHeader } from "@/components/DashboardHeader";
import { PropsWithChildren } from "react";

const UserDashboard = async ({ children }: PropsWithChildren) => {
  return (
    <div>
      <DashboardHeader />
      <main className="flex-1 bg-white p-8">{children}</main>
      {/* <DashboardSidebar /> */}
    </div>
  );
};

export default UserDashboard;
