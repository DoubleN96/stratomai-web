"use client";

import { Users, FolderKanban, Target, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Clientes Activos",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-950",
  },
  {
    title: "Proyectos en Curso",
    value: "18",
    change: "+5%",
    trend: "up",
    icon: FolderKanban,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-950",
  },
  {
    title: "Leads Generados",
    value: "1,247",
    change: "+23%",
    trend: "up",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-950",
  },
  {
    title: "ROI Promedio",
    value: "8.5x",
    change: "-2%",
    trend: "down",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-950",
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? ArrowUp : ArrowDown;

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs mt-1">
                <TrendIcon
                  className={`h-3 w-3 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                />
                <span
                  className={
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-zinc-500">vs mes anterior</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
