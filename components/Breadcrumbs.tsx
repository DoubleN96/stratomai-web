import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 flex-wrap font-mono text-sm">
        {/* Home */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-2 text-[#e8e6df]/50 hover:text-[#8b7355] transition-colors"
          >
            <Home size={16} />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight size={16} className="text-[#8b7355]/30" />
              {isLast ? (
                <span className="text-[#8b7355] uppercase tracking-wider text-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[#e8e6df]/50 hover:text-[#8b7355] transition-colors uppercase tracking-wider text-xs"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
