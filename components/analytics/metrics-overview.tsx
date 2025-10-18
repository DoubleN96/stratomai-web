"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Target, DollarSign, Activity } from "lucide-react";

type Metric = {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: typeof TrendingUp;
};

export function MetricsOverview({ metrics }: { metrics?: Metric[] }) {
  const defaultMetrics: Metric[] = metrics || [
    { title: "Leads Generados", value: "1,234", change: "+12.5%", trend: "up", icon: Users },
    { title: "Tasa de Conversión", value: "24.3%", change: "+3.2%", trend: "up", icon: Target },
    { title: "Revenue Total", value: "€45.2k", change: "+18.7%", trend: "up", icon: DollarSign },
    { title: "Campaigns Activas", value: "18", change: "-2", trend: "down", icon: Activity },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {defaultMetrics.map((metric, idx) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor = metric.trend === "up"
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400";

        return (
          <Card key={idx} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-500">{metric.title}</span>
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">{metric.value}</div>
            <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
              <TrendIcon className="h-4 w-4" />
              <span>{metric.change} vs mes anterior</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
