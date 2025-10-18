import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/config";
import { DashboardSidebar } from "@/components/layouts/dashboard-sidebar";
import { DashboardHeader } from "@/components/layouts/dashboard-header";
import { PageBreadcrumb } from "@/components/layouts/page-breadcrumb";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <DashboardSidebar />

      <div className="md:pl-64">
        <DashboardHeader />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="mb-4">
            <PageBreadcrumb />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
