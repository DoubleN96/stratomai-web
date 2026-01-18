'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeIn } from '@/lib/motion-variants';

type StatCardProps = {
  value: string;
  label: string;
  icon?: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  delay?: number;
  className?: string;
};

const colorClasses = {
  blue: {
    border: 'border-brand-primary-600',
    text: 'text-brand-primary-600',
    bg: 'bg-brand-primary-50',
  },
  green: {
    border: 'border-brand-accent-600',
    text: 'text-brand-accent-600',
    bg: 'bg-brand-accent-50',
  },
  purple: {
    border: 'border-purple-600',
    text: 'text-blue-600',
    bg: 'bg-purple-50',
  },
  orange: {
    border: 'border-orange-600',
    text: 'text-orange-600',
    bg: 'bg-orange-50',
  },
};

export function StatCard({
  value,
  label,
  icon: Icon,
  color = 'blue',
  delay = 0,
  className,
}: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={cn(
        'bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300',
        `border-l-4 ${colors.border}`,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div
            className={cn(
              'text-4xl lg:text-5xl font-bold tabular-nums mb-2',
              colors.text
            )}
          >
            {value}
          </div>
          <div className="text-sm text-gray-600 font-medium">{label}</div>
        </div>
        {Icon && (
          <div
            className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center',
              colors.bg,
              colors.text
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
