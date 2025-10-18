"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormData } from "@/lib/validations/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

type ProjectFormProps = {
  clientId?: string;
  initialData?: Partial<ProjectFormData> & { id?: string };
  mode?: "create" | "edit";
};

export function ProjectForm({ clientId, initialData, mode = "create" }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Array<{ id: string; name: string }>>([]);
  const [managers, setManagers] = useState<Array<{ id: string; name: string }>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      status: "PLANNING",
      clientId: clientId || "",
    },
  });

  const statusValue = watch("status");
  const clientIdValue = watch("clientId");
  const managerIdValue = watch("managerId");

  useEffect(() => {
    Promise.all([
      fetch("/api/clients?limit=100").then((r) => r.json()),
      fetch("/api/users?role=OPERATOR&role=ADMIN").then((r) => r.json()).catch(() => ({ users: [] })),
    ]).then(([clientsData, managersData]) => {
      setClients(clientsData.clients || []);
      setManagers(managersData.users || []);
    });
  }, []);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setLoading(true);
      const url = mode === "edit" && initialData?.id ? `/api/projects/${initialData.id}` : "/api/projects";
      const method = mode === "edit" ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al guardar proyecto");

      router.push(`/dashboard/clientes/${data.clientId}`);
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error al guardar proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="name">Nombre *</Label>
          <Input id="name" {...register("name")} placeholder="Proyecto SEO Q1" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea id="description" {...register("description")} rows={3} />
        </div>

        <div className="space-y-2">
          <Label>Cliente *</Label>
          <Select value={clientIdValue} onValueChange={(v: string) => setValue("clientId", v)} disabled={!!clientId}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {clients.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}
            </SelectContent>
          </Select>
          {errors.clientId && <p className="text-sm text-red-600">{errors.clientId.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Manager *</Label>
          <Select value={managerIdValue} onValueChange={(v: string) => setValue("managerId", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {managers.map((m) => (<SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>))}
            </SelectContent>
          </Select>
          {errors.managerId && <p className="text-sm text-red-600">{errors.managerId.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Estado</Label>
          <Select value={statusValue} onValueChange={(v: string) => setValue("status", v as any)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="PLANNING">Planificación</SelectItem>
              <SelectItem value="IN_PROGRESS">En Progreso</SelectItem>
              <SelectItem value="ON_HOLD">En Espera</SelectItem>
              <SelectItem value="COMPLETED">Completado</SelectItem>
              <SelectItem value="CANCELLED">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Presupuesto (€)</Label>
          <Input id="budget" type="number" step="0.01" {...register("budget")} />
        </div>

        <div className="space-y-2">
          <Label>Fecha Inicio</Label>
          <Input id="startDate" type="date" {...register("startDate")} />
        </div>

        <div className="space-y-2">
          <Label>Fecha Fin</Label>
          <Input id="endDate" type="date" {...register("endDate")} />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {mode === "create" ? "Crear Proyecto" : "Guardar"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
