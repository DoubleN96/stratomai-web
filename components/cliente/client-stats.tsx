"use client";

import { Target, TrendingUp, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Leads este Mes",
    value: "342",
    change: "+23.1%",
    icon: Target,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-950",
  },
  {
    title: "Tasa de Conversión",
    value: "18.5%",
    change: "+4.3%",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-950",
  },
  {
    title: "Contactos Totales",
    value: "1,284",
    change: "+12.5%",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-950",
  },
  {
    title: "ROI Generado",
    value: "€12,450",
    change: "+18.7%",
    icon: DollarSign,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-950",
  },
];

export function ClientStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

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
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {stat.change} vs mes anterior
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
