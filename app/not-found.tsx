'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#e8e6df] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl lg:text-[200px] font-bold text-[#8b7355] font-mono tabular-nums leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-bold font-serif">
            Page Not Found
          </h2>
          <p className="text-lg lg:text-xl text-[#e8e6df]/60 font-sans font-light">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#8b7355] text-[#0a0f0d] font-mono text-sm tracking-widest uppercase hover:bg-[#a08766] transition-colors duration-300"
          >
            <Home size={20} />
            <span>Return Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#8b7355]/40 text-[#8b7355] font-mono text-sm tracking-widest uppercase hover:border-[#8b7355] hover:bg-[#8b7355]/10 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-16 border-t border-[#8b7355]/20">
          <p className="text-sm uppercase tracking-widest text-[#e8e6df]/40 font-mono mb-6">
            Quick Links
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#products"
              className="text-[#e8e6df]/60 hover:text-[#8b7355] transition-colors duration-300 text-sm font-mono"
            >
              Products
            </Link>
            <span className="text-[#8b7355]/30">•</span>
            <Link
              href="/#process"
              className="text-[#e8e6df]/60 hover:text-[#8b7355] transition-colors duration-300 text-sm font-mono"
            >
              Process
            </Link>
            <span className="text-[#8b7355]/30">•</span>
            <Link
              href="/#contact"
              className="text-[#e8e6df]/60 hover:text-[#8b7355] transition-colors duration-300 text-sm font-mono"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none -z-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-[#8b7355] rotate-45" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 border border-[#8b7355] -rotate-12" />
        </div>
      </div>
    </div>
  );
}
