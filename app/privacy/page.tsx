import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-20 px-6 lg:px-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold mb-12 text-blue-700">Política de Privacidad</h1>
        
        <div className="space-y-8 text-lg leading-relaxed text-gray-600">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Identidad del Responsable</h2>
            <p>Stratoma AI, con sede en Madrid, España, es responsable del tratamiento de sus datos personales. Para cualquier consulta, puede contactarnos en <strong>stratoma.ai@gmail.com</strong>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Datos Recopilados vía Google OAuth</h2>
            <p>Nuestra aplicación utiliza Google OAuth para facilitar el acceso y la personalización. Recopilamos su nombre y dirección de correo electrónico únicamente para identificación y autenticación dentro de nuestras herramientas de IA.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalidad del Tratamiento</h2>
            <p>Los datos se utilizan exclusivamente para:</p>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-500">
              <li>Permitir el acceso seguro a la plataforma.</li>
              <li>Personalizar los resultados de generación de contenido IA.</li>
              <li>Enviar notificaciones críticas sobre el servicio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Seguridad y Derechos</h2>
            <p>Implementamos medidas de seguridad de última generación para proteger su información. Usted tiene derecho a acceder, rectificar o eliminar sus datos en cualquier momento.</p>
          </section>

          <p className="pt-10 border-t border-gray-100 text-sm italic text-gray-400 text-center">Última actualización: Enero 2026. Stratoma AI Group.</p>
        </div>
      </div>
    </div>
  );
}
