'use client';

import { Calendar, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CalendlyButtonProps {
  text?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'link';
}

export default function CalendlyButton({
  text = 'Agendar Consultoría Gratuita',
  className = '',
  variant = 'primary'
}: CalendlyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const calendlyUrl = 'https://calendly.com/stratomai/consultoria-gratuita-30min'; // Actualiza con tu URL real

  useEffect(() => {
    // Load Calendly widget script
    if (isOpen && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold transition-all';

    switch (variant) {
      case 'primary':
        return `${baseClasses} px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50`;
      case 'secondary':
        return `${baseClasses} px-8 py-4 bg-white border-2 border-purple-200 text-purple-600 rounded-xl hover:border-purple-400`;
      case 'link':
        return `${baseClasses} text-purple-600 hover:text-purple-700 underline`;
      default:
        return baseClasses;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${getButtonClasses()} ${className}`}
      >
        <Calendar className="w-5 h-5" />
        {text}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Reserva tu Consultoría Gratuita</h3>
                <p className="text-gray-600 mt-1">30 minutos de análisis personalizado</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Calendly Embed */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div
                className="calendly-inline-widget"
                data-url={calendlyUrl}
                style={{ minWidth: '320px', height: '700px' }}
              ></div>

              {/* Fallback if script not loaded */}
              <noscript>
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">
                    JavaScript necesario para cargar el calendario
                  </p>
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Abrir Calendly en nueva pestaña
                  </a>
                </div>
              </noscript>

              {/* Alternative: Direct link */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
                <p className="text-sm text-gray-600 mb-2">
                  ¿Problemas con el calendario?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    Abrir en nueva pestaña
                  </a>
                  <a
                    href="https://wa.me/34611031947?text=Hola%2C%20quiero%20agendar%20una%20consultoría%20gratuita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
                  >
                    O agenda por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
