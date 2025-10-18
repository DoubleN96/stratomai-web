import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autenticación | Stratomai",
  description: "Accede a tu cuenta de Stratomai",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
