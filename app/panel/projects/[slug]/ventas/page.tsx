import { notFound } from "next/navigation";
import Link from "next/link";
import { requireSession } from "@/lib/panel/auth";
import { getProject } from "@/lib/panel/queries";
import { getSalesDashboard } from "@/lib/panel/intkapital/sales-data";
import { getLatestMetaSnapshot } from "@/lib/panel/intkapital/meta-snapshots";
import { getLatestSetterContactSnapshot } from "@/lib/panel/intkapital/setter-contact-snapshots";
import {
  loadDecryptedConfig,
  resolveMetaConfig,
} from "@/lib/panel/intkapital/config-resolver";
import { PanelHeader } from "@/components/panel/PanelHeader";
import { EmptyState, GlassCard, StatusBadge } from "@/components/panel/ui";
import { SalesFunnel } from "@/components/panel/intkapital/SalesFunnel";
import { OverviewSection } from "@/components/panel/intkapital/OverviewSection";
import {
  SetterCard,
  CloserCard,
} from "@/components/panel/intkapital/PersonCards";
import { MetaSection } from "@/components/panel/intkapital/MetaSection";
import { MetaAdminControls } from "@/components/panel/intkapital/MetaAdminControls";
import { SetterContactControls } from "@/components/panel/intkapital/SetterContactControls";

export const dynamic = "force-dynamic";
// The admin "pull setter metrics" server action invoked from this route can run
// a multi-minute GHL crawl (~900 calls). Give it headroom on platforms that
// honor maxDuration; the read path stays fast (it only reads the snapshot).
export const maxDuration = 300;

export default async function VentasPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { profile } = await requireSession();
  const isAdmin = profile.role === "admin";

  // RLS returns null if the user is not a member of this project (anti-IDOR).
  const project = await getProject(slug);
  if (!project) notFound();

  // GHL dashboard (cached). Returns a friendly error result rather than throwing.
  const sales = await getSalesDashboard(slug);

  // Meta snapshot (read-only for the team). Admin also needs to know if a token
  // is already stored to label the control. Decrypt the project config ONCE
  // (admin only) and reuse it for the Meta-token check.
  const metaSnapshot = await getLatestMetaSnapshot(slug).catch(() => null);

  // Setter contact/speed metrics snapshot (read-only for the team; computed by
  // the admin pull because the crawl is ~900 GHL calls). null until first pull.
  const setterContact = await getLatestSetterContactSnapshot(slug).catch(
    () => null,
  );
  const setterContactByUser = new Map(
    (setterContact?.data.setters ?? []).map((s) => [s.ghlUserId, s]),
  );
  const metaHasToken = isAdmin
    ? await loadDecryptedConfig(slug)
        .then((cfg) => resolveMetaConfig(slug, cfg))
        .then((m) => !!m.token)
        .catch(() => false)
    : false;

  return (
    <>
      <PanelHeader profile={profile} active="dashboard" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href={`/panel/projects/${slug}`}
          className="text-sm text-[#8597c0] transition-colors hover:text-white"
        >
          ← Volver al proyecto
        </Link>

        <div className="mt-3 mb-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-white">{project.name}</h1>
          <StatusBadge status={project.status} />
          <span className="rounded-full border border-[#2c3f6b] bg-[#16223f] px-2.5 py-0.5 text-xs font-medium text-[#9fc0ff]">
            KPIs de ventas · solo lectura
          </span>
        </div>
        {sales.ok && sales.data && (
          <p className="mb-8 text-xs text-[#5a6b94]">
            {sales.data.sourceCount} oportunidades · datos GHL FUNNEL PRINCIPAL
            · actualizado{" "}
            {new Date(sales.data.generatedAt).toLocaleString("es-ES")}
          </p>
        )}

        {!sales.ok || !sales.data ? (
          <GlassCard>
            <h2 className="mb-2 text-base font-semibold text-[#ff8a8a]">
              No se pudieron cargar los datos de ventas
            </h2>
            <p className="text-sm text-[#9fb0d8]">{sales.error}</p>
            {isAdmin && (
              <p className="mt-3 text-xs text-[#7f90b8]">
                {sales.adminDetail
                  ? `Detalle: ${sales.adminDetail}.`
                  : "Revisa la configuración GHL del proyecto (GHL_PIT, GHL_LOCATION_ID, GHL_PIPELINE_ID) en la sección de configuración."}
              </p>
            )}
          </GlassCard>
        ) : (
          <div className="space-y-12">
            {/* Overview / manager view */}
            <section>
              <h2 className="mb-4 text-lg font-bold text-white">
                Resumen del equipo
              </h2>
              <OverviewSection
                overview={sales.data.overview}
                contact={setterContact?.data.global}
              />
            </section>

            {/* Funnel */}
            <section>
              <h2 className="mb-4 text-lg font-bold text-white">Embudo</h2>
              <SalesFunnel funnel={sales.data.funnel} />
            </section>

            {/* Setters */}
            <section>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-white">Setters</h2>
                {setterContact?.updatedAt && (
                  <span className="text-xs text-[#5a6b94]">
                    contacto actualizado{" "}
                    {new Date(setterContact.updatedAt).toLocaleString("es-ES")}
                    {setterContact.data.leadsSkipped > 0 && (
                      <> · {setterContact.data.leadsSkipped} sin datos</>
                    )}
                  </span>
                )}
              </div>
              {isAdmin && (
                <div className="mb-4">
                  <SetterContactControls
                    slug={slug}
                    hasSnapshot={!!setterContact}
                  />
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sales.data.setters.map((s) => (
                  <SetterCard
                    key={s.ghlUserId}
                    kpi={s}
                    contact={setterContactByUser.get(s.ghlUserId)}
                  />
                ))}
              </div>
            </section>

            {/* Closers */}
            <section>
              <h2 className="mb-4 text-lg font-bold text-white">Closers</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sales.data.closers.map((c) => (
                  <CloserCard key={c.ghlUserId} kpi={c} />
                ))}
              </div>
            </section>

            {/* Meta Ads */}
            <section>
              <h2 className="mb-4 text-lg font-bold text-white">
                Campañas Meta Ads
              </h2>
              {isAdmin && (
                <div className="mb-4">
                  <MetaAdminControls slug={slug} hasToken={metaHasToken} />
                </div>
              )}
              <MetaSection snapshot={metaSnapshot} />
            </section>

            {/* Fathom — scaffolded for a later phase */}
            <section>
              <h2 className="mb-4 text-lg font-bold text-white">
                Análisis de discovery (Fathom)
              </h2>
              <EmptyState>
                Próxima fase: análisis diario de las llamadas de discovery
                (objeciones, sentiment, próximos pasos) con Fathom. La API key
                ya está configurada (cifrada). Pendiente de implementar el job
                de ingesta + resumen.
              </EmptyState>
            </section>
          </div>
        )}
      </main>
    </>
  );
}
