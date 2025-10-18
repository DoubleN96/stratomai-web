import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Mail, Phone, Globe, MapPin, Building2, Calendar, Users, Target } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

type PageProps = {
  params: Promise<{ id: string }>;
};

const statusColors = {
  ACTIVE: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  INACTIVE: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
  CHURNED: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
};

const statusLabels = {
  ACTIVE: "Activo",
  INACTIVE: "Inactivo",
  CHURNED: "Perdido",
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
    select: { name: true },
  });

  return {
    title: client ? client.name : "Cliente",
    description: "Detalles del cliente",
  };
}

export default async function ClienteDetallePage({ params }: PageProps) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      createdBy: {
        select: { name: true, email: true },
      },
      projects: {
        include: {
          manager: {
            select: { name: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      campaigns: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      _count: {
        select: {
          projects: true,
          campaigns: true,
        },
      },
    },
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/clientes">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{client.name}</h1>
              <Badge className={statusColors[client.status as keyof typeof statusColors]}>
                {statusLabels[client.status as keyof typeof statusLabels]}
              </Badge>
            </div>
            {client.company && (
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                {client.company}
              </p>
            )}
          </div>
        </div>
        <Link href={`/dashboard/clientes/${client.id}/editar`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Datos de Contacto */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Información de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Email</p>
                  <a
                    href={`mailto:${client.email}`}
                    className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {client.email}
                  </a>
                </div>
              </div>

              {client.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Teléfono</p>
                    <a
                      href={`tel:${client.phone}`}
                      className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {client.phone}
                    </a>
                  </div>
                </div>
              )}

              {client.website && (
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Sitio Web</p>
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {client.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              )}

              {client.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Dirección</p>
                    <p className="font-medium">{client.address}</p>
                  </div>
                </div>
              )}

              {client.industry && (
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Industria</p>
                    <p className="font-medium">{client.industry}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Cliente desde</p>
                  <p className="font-medium">
                    {formatDistanceToNow(new Date(client.createdAt), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </p>
                </div>
              </div>
            </div>

            {client.notes && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Notas</p>
                <p className="text-sm whitespace-pre-wrap">{client.notes}</p>
              </div>
            )}
          </Card>

          {/* Proyectos */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Proyectos</h2>
              <Badge variant="outline">
                {client._count.projects} total
              </Badge>
            </div>

            {client.projects.length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-8">
                No hay proyectos aún
              </p>
            ) : (
              <div className="space-y-3">
                {client.projects.map((project: typeof client.projects[0]) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Gerente: {project.manager.name}
                      </p>
                    </div>
                    <Badge>{project.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Campañas */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Campañas</h2>
              <Badge variant="outline">
                {client._count.campaigns} total
              </Badge>
            </div>

            {client.campaigns.length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-8">
                No hay campañas aún
              </p>
            ) : (
              <div className="space-y-3">
                {client.campaigns.map((campaign: typeof client.campaigns[0]) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {campaign.type}
                      </p>
                    </div>
                    <Badge>{campaign.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Estadísticas */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Resumen</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{client._count.projects}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Proyectos</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                  <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{client._count.campaigns}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Campañas</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Información del Sistema */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Información del Sistema</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Creado por</p>
                <p className="font-medium">{client.createdBy.name}</p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Fecha de creación</p>
                <p className="font-medium">
                  {new Date(client.createdAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Última actualización</p>
                <p className="font-medium">
                  {formatDistanceToNow(new Date(client.updatedAt), {
                    addSuffix: true,
                    locale: es,
                  })}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
