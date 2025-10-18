import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

const campaigns = [
  {
    id: 1,
    name: "LinkedIn Lead Generation",
    status: "active",
    progress: 75,
    leads: 127,
    target: 200,
  },
  {
    id: 2,
    name: "WhatsApp Automation",
    status: "active",
    progress: 45,
    leads: 89,
    target: 150,
  },
  {
    id: 3,
    name: "SEO Content Campaign",
    status: "paused",
    progress: 30,
    leads: 45,
    target: 100,
  },
];

const statusConfig = {
  active: {
    label: "Activa",
    color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  },
  paused: {
    label: "Pausada",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  },
};

export function ActiveCampaigns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campañas Activas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="space-y-3 pb-4 last:pb-0 last:border-0 border-b border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  {campaign.name}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {campaign.leads} de {campaign.target} leads
                </div>
              </div>
              <Badge className={statusConfig[campaign.status as keyof typeof statusConfig].color}>
                {statusConfig[campaign.status as keyof typeof statusConfig].label}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-600 dark:text-zinc-400">Progreso</span>
                <span className="font-medium">{campaign.progress}%</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
