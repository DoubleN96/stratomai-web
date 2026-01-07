import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'gradient-blue' | 'gradient-green' | 'dark';
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  'gradient-blue': 'bg-gradient-to-br from-blue-50 via-white to-gray-50',
  'gradient-green': 'bg-gradient-to-br from-green-50 via-white to-blue-50',
  dark: 'bg-gray-900 text-white',
};

const paddingClasses = {
  none: '',
  sm: 'py-12 lg:py-16',
  md: 'py-16 lg:py-20',
  lg: 'py-20 lg:py-28',
  xl: 'py-24 lg:py-32',
};

export function Section({
  children,
  className,
  id,
  background = 'white',
  paddingY = 'lg',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        backgroundClasses[background],
        paddingClasses[paddingY],
        className
      )}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  );
}
