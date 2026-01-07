import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'default' | 'full';
  className?: string;
};

const variantClasses = {
  primary: 'bg-brand-primary-100 text-brand-primary-700 border-brand-primary-200',
  secondary: 'bg-brand-accent-100 text-brand-accent-700 border-brand-accent-200',
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
};

const sizeClasses = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const roundedClasses = {
  default: 'rounded-lg',
  full: 'rounded-full',
};

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium border',
        variantClasses[variant],
        sizeClasses[size],
        roundedClasses[rounded],
        className
      )}
    >
      {children}
    </span>
  );
}
