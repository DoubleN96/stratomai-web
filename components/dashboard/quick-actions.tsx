import Link from "next/link";
import { Plus, UserPlus, FileText, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Nuevo Cliente",
    description: "Agregar un nuevo cliente",
    href: "/dashboard/clientes/crear",
    icon: UserPlus,
    color: "text-blue-600",
  },
  {
    title: "Nuevo Proyecto",
    description: "Crear proyecto para cliente",
    href: "/dashboard/proyectos/crear",
    icon: Plus,
    color: "text-purple-600",
  },
  {
    title: "Generar Reporte",
    description: "Crear reporte de resultados",
    href: "/dashboard/reportes/crear",
    icon: FileText,
    color: "text-green-600",
  },
  {
    title: "Nueva Campaña",
    description: "Lanzar campaña de leads",
    href: "/dashboard/campanas/crear",
    icon: Send,
    color: "text-orange-600",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.title}
              variant="outline"
              className="justify-start h-auto py-4 px-4"
              asChild
            >
              <Link href={action.href}>
                <Icon className={`h-5 w-5 mr-3 ${action.color}`} />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-zinc-500">{action.description}</div>
                </div>
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
