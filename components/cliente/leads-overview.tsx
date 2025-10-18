import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Mail, MessageSquare, Phone } from "lucide-react";

const sources = [
  {
    name: "LinkedIn",
    leads: 142,
    percentage: 41,
    icon: ArrowUpRight,
    color: "text-blue-600",
  },
  {
    name: "WhatsApp",
    leads: 98,
    percentage: 29,
    icon: MessageSquare,
    color: "text-green-600",
  },
  {
    name: "Email",
    leads: 67,
    percentage: 20,
    icon: Mail,
    color: "text-purple-600",
  },
  {
    name: "Llamadas",
    leads: 35,
    percentage: 10,
    icon: Phone,
    color: "text-orange-600",
  },
];

export function LeadsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Origen de Leads</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sources.map((source) => {
          const Icon = source.icon;
          return (
            <div key={source.name} className="flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 ${source.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{source.name}</span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {source.leads} leads
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{source.percentage}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
