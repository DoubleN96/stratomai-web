'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '34611031947';

  const predefinedMessages = [
    {
      text: '🚀 Quiero información sobre el Sprint de Automatización',
      message: 'Hola, quiero información sobre el Sprint de Automatización IA en 14 días'
    },
    {
      text: '📊 Usé la calculadora ROI y quiero más info',
      message: 'Hola, acabo de usar la calculadora de ROI y quiero saber más sobre automatización'
    },
    {
      text: '📅 Quiero agendar una consultoría gratuita',
      message: 'Hola, me gustaría agendar una consultoría gratuita de 30 minutos'
    },
    {
      text: '💬 Tengo una pregunta general',
      message: 'Hola, tengo una pregunta sobre sus servicios de IA'
    }
  ];

  const handleWhatsAppClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Messages Popup */}
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-80 mb-2 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Stratoma AI</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Online ahora
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              ¡Hola! 👋 ¿En qué podemos ayudarte?
            </p>

            <div className="space-y-2">
              {predefinedMessages.map((msg, i) => (
                <button
                  key={i}
                  onClick={() => handleWhatsAppClick(msg.message)}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-xl text-sm transition-all"
                >
                  {msg.text}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                O escribe tu mensaje personalizado →
              </a>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
          aria-label="Abrir chat de WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />

          {/* Pulse animation */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
          </span>

          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            ¿Necesitas ayuda?
            <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-900"></div>
          </div>
        </button>
      </div>
    </>
  );
}
