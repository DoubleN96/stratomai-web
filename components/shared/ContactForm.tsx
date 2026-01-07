'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { fadeInUp } from '@/lib/motion-variants';

type FormData = {
  nombre: string;
  email: string;
  empresa: string;
  telefono: string;
  servicio: string;
  mensaje: string;
};

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    empresa: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });

  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setFormState('success');
      setFormData({
        nombre: '',
        email: '',
        empresa: '',
        telefono: '',
        servicio: '',
        mensaje: '',
      });
    } catch (error) {
      setFormState('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.'
      );
    }
  };

  if (formState === 'success') {
    return (
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center border-2 border-green-200"
      >
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gray-900">
          ¡Mensaje Enviado!
        </h3>
        <p className="text-gray-700 mb-6">
          Gracias por contactarnos. Te responderemos en menos de 24 horas.
        </p>
        <button
          onClick={() => setFormState('idle')}
          className="text-brand-primary-600 font-medium hover:text-brand-primary-700 transition-colors duration-200"
        >
          Enviar otro mensaje
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 shadow-lg space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Nombre completo *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 border border-gray-300 focus:border-brand-primary-600 focus:ring-2 focus:ring-brand-primary-100 outline-none px-4 py-3 rounded-lg transition-all duration-200"
            placeholder="Juan Pérez"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 border border-gray-300 focus:border-brand-primary-600 focus:ring-2 focus:ring-brand-primary-100 outline-none px-4 py-3 rounded-lg transition-all duration-200"
            placeholder="juan@empresa.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Empresa */}
        <div>
          <label
            htmlFor="empresa"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Empresa
          </label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-300 focus:border-brand-primary-600 focus:ring-2 focus:ring-brand-primary-100 outline-none px-4 py-3 rounded-lg transition-all duration-200"
            placeholder="Mi Empresa SL"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label
            htmlFor="telefono"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Teléfono / WhatsApp
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-300 focus:border-brand-primary-600 focus:ring-2 focus:ring-brand-primary-100 outline-none px-4 py-3 rounded-lg transition-all duration-200"
            placeholder="+34 600 000 000"
          />
        </div>
      </div>

      {/* Servicio */}
      <div>
        <label
          htmlFor="servicio"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Servicio de interés
        </label>
        <select
          id="servicio"
          name="servicio"
          value={formData.servicio}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-300 focus:border-brand-primary-600 focus:ring-2 focus:ring-brand-primary-100 outline-none px-4 py-3 rounded-lg transition-all duration-200"
        >
          <option value="">Selecciona un servicio</option>
          <option value="whatsapp">Automatización WhatsApp</option>
          <option value="gohighlevel">GoHighLevel</option>
          <option value="n8n">n8n Automation</option>
          <option value="ai-agents">Agentes de IA</option>
          <option value="consultoria">Consultoría</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label
          htmlFor="mensaje"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          rows={6}
          className="w-full bg-gray-50 border border-gray-300 focus:border-brand-primary-600 focus:ring-2 focus:ring-brand-primary-100 outline-none px-4 py-3 rounded-lg transition-all duration-200 resize-none"
          placeholder="Cuéntanos sobre tu proyecto y cómo podemos ayudarte..."
        />
      </div>

      {/* Error Message */}
      {formState === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <CTAButton
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          icon={Send}
          iconPosition="right"
          loading={formState === 'loading'}
          disabled={formState === 'loading'}
        >
          {formState === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
        </CTAButton>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Al enviar este formulario, aceptas nuestra política de privacidad y
        términos de servicio.
      </p>
    </motion.form>
  );
}
