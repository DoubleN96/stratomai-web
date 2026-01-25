import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white py-20 px-6 lg:px-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold mb-12 text-blue-700">Términos de Servicio</h1>
        
        <div className="space-y-8 text-lg leading-relaxed text-gray-600">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceptación de los Términos</h2>
            <p>Al utilizar el Generador de WEBs Stratomai, usted acepta estos términos en su totalidad. Stratoma AI proporciona herramientas de IA basadas en la nube para empresas.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Uso de la Tecnología IA</h2>
            <p>El usuario reconoce que los resultados generados por IA deben ser revisados por humanos. Stratoma AI no garantiza la exactitud absoluta de los datos producidos por modelos externos integrados.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Responsabilidad del Usuario</h2>
            <p>Usted es responsable de la seguridad de su cuenta y del contenido que decida publicar utilizando nuestras herramientas.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propiedad Intelectual</h2>
            <p>El código y los diseños generados pertenecen al usuario, reservándose Stratoma AI el derecho a procesar los datos para la optimización técnica del servicio.</p>
          </section>

          <p className="pt-10 border-t border-gray-100 text-sm text-gray-400 text-center">© 2026 Stratoma Consulting Group - Madrid, España.</p>
        </div>
      </div>
    </div>
  );
}
