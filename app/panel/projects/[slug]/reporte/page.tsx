import { notFound } from 'next/navigation';
import Link from 'next/link';
import { requireSession } from '@/lib/panel/auth';
import {
  getOwnSalesReport,
  getOwnSalesReportNote,
  getProject,
  isProjectMember,
  listRecentSalesReportNotes,
  listRecentSalesReports,
} from '@/lib/panel/queries';
import { summariseWeek } from '@/lib/panel/reports';
import { PanelHeader } from '@/components/panel/PanelHeader';
import { ReportForm } from '@/components/panel/ReportForm';
import {
  ReportHistory,
  WeeklySummaryCard,
} from '@/components/panel/ReportHistory';
import { EmptyState, StatusBadge } from '@/components/panel/ui';

export const dynamic = 'force-dynamic';

// Server-local "today" as YYYY-MM-DD (Europe/Madrid).
function todayMadrid(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

export default async function ReportePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { userId, profile } = await requireSession();

  const project = await getProject(slug);
  if (!project) notFound();

  const isAdmin = profile.role === 'admin';
  const canWrite = isAdmin || (await isProjectMember(slug, userId));

  const today = todayMadrid();
  const [ownReport, ownNote, reports, notes] = await Promise.all([
    getOwnSalesReport(slug, today, userId),
    getOwnSalesReportNote(slug, today, userId),
    listRecentSalesReports(slug, 30),
    listRecentSalesReportNotes(slug, 60),
  ]);

  const weekly = summariseWeek(reports, new Date(`${today}T00:00:00Z`));

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

        <div className="mt-3 mb-6 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">
            Reporte diario · {project.name}
          </h1>
          <StatusBadge status={project.status} />
        </div>

        {canWrite ? (
          <ReportForm
            slug={slug}
            defaultDate={today}
            report={ownReport}
            note={ownNote}
          />
        ) : (
          <EmptyState>
            No perteneces a este proyecto, así que no puedes crear reportes.
            Puedes consultar el histórico más abajo.
          </EmptyState>
        )}

        {reports.length > 0 && (
          <div className="mt-8">
            <WeeklySummaryCard summary={weekly} />
          </div>
        )}

        {reports.length > 0 ? (
          <div className="mt-8">
            <ReportHistory reports={reports} notes={notes} />
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState>
              Aún no hay reportes para este proyecto. Crea el primero arriba.
            </EmptyState>
          </div>
        )}
      </main>
    </>
  );
}
