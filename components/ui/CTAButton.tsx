'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type CTAButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
};

const variantClasses = {
  primary:
    'bg-brand-primary-600 text-white hover:bg-brand-primary-700 shadow-lg shadow-brand-primary-600/30',
  secondary:
    'bg-brand-secondary-600 text-white hover:bg-brand-secondary-700 shadow-lg shadow-brand-secondary-600/30',
  outline:
    'bg-white border-2 border-gray-300 text-gray-700 hover:border-brand-primary-600 hover:text-brand-primary-600',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'right',
      loading = false,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        type={props.type || 'button'}
        onClick={props.onClick}
        onSubmit={props.onSubmit}
        aria-label={props['aria-label']}
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {!loading && Icon && iconPosition === 'left' && (
          <Icon className="w-5 h-5" />
        )}
        <span>{children}</span>
        {!loading && Icon && iconPosition === 'right' && (
          <Icon className="w-5 h-5" />
        )}
      </button>
    );
  }
);

CTAButton.displayName = 'CTAButton';
