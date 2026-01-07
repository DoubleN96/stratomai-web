'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/lib/motion-variants';

type ProcessStepProps = {
  step: number;
  title: string;
  description: string;
  delay?: number;
  className?: string;
};

export function ProcessStep({
  step,
  title,
  description,
  delay = 0,
  className,
}: ProcessStepProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={cn(
        'group relative bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-brand-primary-500 hover:shadow-xl transition-all duration-300',
        className
      )}
    >
      {/* Large background number */}
      <div className="absolute top-4 right-4 text-7xl font-bold text-gray-50 group-hover:text-brand-primary-50 transition-colors duration-300 select-none">
        {String(step).padStart(2, '0')}
      </div>

      {/* Step badge */}
      <div className="relative z-10 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-brand-primary-500 to-brand-primary-600 text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg">
          {step}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl lg:text-2xl font-bold mb-4 leading-tight text-gray-900 group-hover:text-brand-primary-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
