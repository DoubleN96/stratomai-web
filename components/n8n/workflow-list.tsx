"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PlayCircle, PauseCircle, AlertCircle, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

type Workflow = {
  id: string;
  workflowId: string;
  name: string;
  isActive: boolean;
  lastRunAt: string | null;
  _count: { executions: number };
};

type Execution = {
  id: string;
  status: string;
  startedAt: string;
  error: string | null;
};

export function WorkflowList({ projectId }: { projectId?: string }) {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = projectId ? `/api/n8n/workflows?projectId=${projectId}` : "/api/n8n/workflows";
    fetch(url)
      .then((r) => r.json())
      .then((data) => setWorkflows(data.workflows || []))
      .catch(() => setWorkflows([]))
      .finally(() => setLoading(false));
  }, [projectId]);

  useEffect(() => {
    if (!selectedWorkflow) return;
    fetch(`/api/n8n/workflows/${selectedWorkflow}/executions`)
      .then((r) => r.json())
      .then((data) => setExecutions(data.executions || []))
      .catch(() => setExecutions([]));
  }, [selectedWorkflow]);

  const toggleWorkflow = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/n8n/workflows/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      setWorkflows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isActive: !isActive } : w))
      );
    } catch (error) {
      alert("Error al actualizar workflow");
    }
  };

  if (loading) return <Card className="p-6">Cargando workflows...</Card>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Workflows n8n</h2>

      {workflows.length === 0 ? (
        <Card className="p-8 text-center text-zinc-500">
          No hay workflows registrados. Los workflows se registrarán automáticamente cuando
          se ejecuten por primera vez.
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {workflows.map((w) => (
            <Card key={w.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium">{w.name}</h3>
                  <p className="text-sm text-zinc-500">ID: {w.workflowId}</p>
                </div>
                <Switch
                  checked={w.isActive}
                  onCheckedChange={() => toggleWorkflow(w.id, w.isActive)}
                />
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <PlayCircle className="h-4 w-4 text-blue-600" />
                  <span>{w._count.executions} ejecuciones</span>
                </div>
                {w.lastRunAt && (
                  <span className="text-zinc-500">
                    Última: {formatDistanceToNow(new Date(w.lastRunAt), { addSuffix: true, locale: es })}
                  </span>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3"
                onClick={() => setSelectedWorkflow(selectedWorkflow === w.id ? null : w.id)}
              >
                {selectedWorkflow === w.id ? "Ocultar" : "Ver"} Ejecuciones
              </Button>

              {selectedWorkflow === w.id && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {executions.length === 0 ? (
                    <p className="text-sm text-zinc-500 text-center py-4">
                      No hay ejecuciones
                    </p>
                  ) : (
                    executions.map((e) => (
                      <div key={e.id} className="flex items-center gap-2 p-2 rounded border text-sm">
                        {e.status === "SUCCESS" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="flex-1">
                          {new Date(e.startedAt).toLocaleString("es-ES")}
                        </span>
                        <Badge variant={e.status === "SUCCESS" ? "default" : "destructive"}>
                          {e.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
