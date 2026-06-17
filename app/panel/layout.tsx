import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel | Stratoma AI',
  description: 'Panel interno de gestión de proyectos y reporting de ventas.',
  robots: { index: false, follow: false },
};

// The panel reuses the global dark theme (body bg #0b1326). We keep its own
// minimal chrome so it does not pull in the public marketing nav/footer.
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-[#dae2fd]">
      {/* Ambient background orbs to match the site's Stitch aesthetic */}
      <div
        aria-hidden
        className="bg-orb"
        style={{
          width: 480,
          height: 480,
          top: -120,
          right: -80,
          background: 'rgba(43,108,238,0.18)',
        }}
      />
      <div
        aria-hidden
        className="bg-orb"
        style={{
          width: 420,
          height: 420,
          bottom: -160,
          left: -100,
          background: 'rgba(124,58,237,0.14)',
        }}
      />
      {children}
    </div>
  );
}
