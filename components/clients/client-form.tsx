"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, type ClientFormData } from "@/lib/validations/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clientLogger } from "@/lib/client-logger";
import { Loader2 } from "lucide-react";

type ClientFormProps = {
  initialData?: Partial<ClientFormData> & { id?: string };
  mode?: "create" | "edit";
};

export function ClientForm({ initialData, mode = "create" }: ClientFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: initialData || {
      status: "ACTIVE",
    },
  });

  const statusValue = watch("status");

  const onSubmit = async (data: ClientFormData) => {
    try {
      setLoading(true);

      const url = mode === "edit" && initialData?.id
        ? `/api/clients/${initialData.id}`
        : "/api/clients";

      const method = mode === "edit" ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al guardar cliente");
      }

      const client = await response.json();

      clientLogger.info(`Client ${mode}d`, {
        clientId: client.id,
        mode,
      });

      router.push("/dashboard/clientes");
      router.refresh();
    } catch (error) {
      clientLogger.error(`Error ${mode}ing client`, { error });
      alert(error instanceof Error ? error.message : "Error al guardar cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Nombre <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Juan Pérez"
          />
          {errors.name && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="juan@empresa.com"
          />
          {errors.email && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="+34 600 000 000"
          />
          {errors.phone && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Empresa */}
        <div className="space-y-2">
          <Label htmlFor="company">Empresa</Label>
          <Input
            id="company"
            {...register("company")}
            placeholder="Acme Inc."
          />
          {errors.company && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Industria */}
        <div className="space-y-2">
          <Label htmlFor="industry">Industria</Label>
          <Input
            id="industry"
            {...register("industry")}
            placeholder="Tecnología, Retail, etc."
          />
          {errors.industry && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.industry.message}
            </p>
          )}
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label htmlFor="website">Sitio Web</Label>
          <Input
            id="website"
            {...register("website")}
            placeholder="https://empresa.com"
          />
          {errors.website && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.website.message}
            </p>
          )}
        </div>

        {/* Estado */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="status">Estado</Label>
          <Select
            value={statusValue}
            onValueChange={(value: string) => setValue("status", value as "ACTIVE" | "INACTIVE" | "CHURNED")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Activo</SelectItem>
              <SelectItem value="INACTIVE">Inactivo</SelectItem>
              <SelectItem value="CHURNED">Perdido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dirección */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            {...register("address")}
            placeholder="Calle Principal 123, Madrid"
          />
          {errors.address && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Notas */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notas</Label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="Información adicional sobre el cliente..."
            rows={4}
          />
          {errors.notes && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.notes.message}
            </p>
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {mode === "create" ? "Crear Cliente" : "Guardar Cambios"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
