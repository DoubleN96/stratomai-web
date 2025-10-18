"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

type Project = {
  id: string;
  name: string;
  status: string;
  budget: number | null;
  manager: { name: string };
  _count: { campaigns: number; n8nWorkflows: number };
};

const statusColors: Record<string, string> = {
  PLANNING: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  IN_PROGRESS: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  ON_HOLD: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
  COMPLETED: "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
};

export function ProjectList({ clientId }: { clientId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects?clientId=${clientId}`)
      .then((r) => r.json())
      .then((data) => setProjects(data.projects || []))
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) return <Card className="p-6">Cargando proyectos...</Card>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Proyectos</h2>
        <Link href={`/dashboard/proyectos/nuevo?clientId=${clientId}`}>
          <Button size="sm"><Plus className="h-4 w-4 mr-2" />Nuevo Proyecto</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card className="p-8 text-center text-zinc-500">No hay proyectos aún</Card>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <Card key={p.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{p.name}</h3>
                  <p className="text-sm text-zinc-500">Manager: {p.manager.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  {p.budget && <span className="text-sm font-medium">{p.budget.toLocaleString()} €</span>}
                  <Badge className={statusColors[p.status]}>{p.status}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
