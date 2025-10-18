import { ClientStats } from "@/components/cliente/client-stats";
import { ActiveCampaigns } from "@/components/cliente/active-campaigns";
import { LeadsOverview } from "@/components/cliente/leads-overview";
import { PerformanceChart } from "@/components/cliente/performance-chart";

export default function ClienteDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tu Dashboard</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Monitorea el rendimiento de tus campañas en tiempo real
        </p>
      </div>

      <ClientStats />

      <div className="grid lg:grid-cols-2 gap-6">
        <ActiveCampaigns />
        <LeadsOverview />
      </div>

      <PerformanceChart />
    </div>
  );
}
