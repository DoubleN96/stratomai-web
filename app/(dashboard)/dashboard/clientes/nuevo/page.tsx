import { ClientForm } from "@/components/clients/client-form";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Nuevo Cliente",
  description: "Crear nuevo cliente",
};

export default function NuevoClientePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/clientes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Nuevo Cliente</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Completa el formulario para agregar un nuevo cliente
          </p>
        </div>
      </div>

      <Card className="p-6 max-w-3xl">
        <ClientForm />
      </Card>
    </div>
  );
}
