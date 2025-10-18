import { ClientForm } from "@/components/clients/client-form";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
    select: { name: true },
  });

  return {
    title: client ? `Editar ${client.name}` : "Editar Cliente",
    description: "Editar información del cliente",
  };
}

export default async function EditarClientePage({ params }: PageProps) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/clientes/${id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Editar Cliente</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Actualiza la información de {client.name}
          </p>
        </div>
      </div>

      <Card className="p-6 max-w-3xl">
        <ClientForm
          initialData={{
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone || undefined,
            company: client.company || undefined,
            industry: client.industry || undefined,
            website: client.website || undefined,
            address: client.address || undefined,
            notes: client.notes || undefined,
            status: client.status,
          }}
          mode="edit"
        />
      </Card>
    </div>
  );
}
