'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cardHover, fadeInUp } from '@/lib/motion-variants';

type ServiceCardProps = {
  title: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
  ctaText?: string;
  ctaLink: string;
  delay?: number;
  className?: string;
};

export function ServiceCard({
  title,
  description,
  benefits,
  icon: Icon,
  ctaText = 'Más información',
  ctaLink,
  delay = 0,
  className,
}: ServiceCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={cn('group h-full', className)}
    >
      <Link href={ctaLink}>
        <motion.div
          variants={cardHover}
          initial="rest"
          whileHover="hover"
          className="h-full bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-brand-primary-500 hover:shadow-xl transition-all duration-300"
        >
          {/* Icon */}
          <div className="mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-primary-500 to-brand-primary-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-7 h-7" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-brand-primary-600 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

          {/* Benefits */}
          {benefits.length > 0 && (
            <ul className="space-y-2 mb-6">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-accent-100 text-brand-accent-600 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-brand-primary-600 font-medium group-hover:gap-3 transition-all duration-300">
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
