import { Suspense } from "react";
import { ClientList } from "@/components/clients/client-list";
import { ClientListSkeleton } from "@/components/clients/client-list-skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Clientes",
  description: "Gestión de clientes",
};

export default function ClientesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Gestiona y organiza tus clientes
          </p>
        </div>
        <Link href="/dashboard/clientes/nuevo">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Cliente
          </Button>
        </Link>
      </div>

      <Suspense fallback={<ClientListSkeleton />}>
        <ClientList />
      </Suspense>
    </div>
  );
}
