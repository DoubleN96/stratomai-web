import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Proyecto completado",
    description: "SEO Automation para Tripath",
    time: "Hace 2 horas",
    status: "completed",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    title: "Nuevo lead capturado",
    description: "LinkedIn - Sector Inmobiliario",
    time: "Hace 4 horas",
    status: "new",
    icon: AlertCircle,
    color: "text-blue-600",
  },
  {
    id: 3,
    title: "Campaña en progreso",
    description: "WhatsApp Automation - 45% completado",
    time: "Hace 6 horas",
    status: "in-progress",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    id: 4,
    title: "Cliente agregado",
    description: "Nueva empresa registrada",
    time: "Hace 1 día",
    status: "completed",
    icon: CheckCircle,
    color: "text-green-600",
  },
];

const statusColors = {
  completed: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  "in-progress": "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  new: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 last:pb-0 last:border-0 border-b border-zinc-200 dark:border-zinc-800"
              >
                <div className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 ${activity.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium">{activity.title}</div>
                    <Badge
                      variant="secondary"
                      className={statusColors[activity.status as keyof typeof statusColors]}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {activity.description}
                  </p>
                  <p className="text-xs text-zinc-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
