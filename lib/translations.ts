export const translations = {
  en: {
    nav: {
      products: 'Products',
      blog: 'Blog',
      faq: 'FAQ',
      about: 'About',
      process: 'Process',
      contact: 'Contact',
    },
    hero: {
      title: 'Global Commodities Trading Excellence',
      subtitle: 'Premier intermediary for international trade in Urea 46% and petrochemical derivatives. Building reliable supply chains across continents.',
      cta: 'Start Trading',
    },
    products: {
      title: 'Our Core Products',
      subtitle: 'Premium quality commodities with certified specifications',
      urea: {
        title: 'Urea 46% Prilled & Granular',
        form: 'Form',
        nitrogen: 'Nitrogen Content',
        moisture: 'Moisture',
        biuret: 'Biuret',
      },
      standards: {
        title: 'Quality Assurance',
        quality: 'ISO 9001:2015 certified quality management',
        inspection: 'SGS/Bureau Veritas third-party inspection',
        certification: 'Full traceability and certification',
      },
    },
    process: {
      title: 'Our Trading Process',
      subtitle: 'A streamlined, secure workflow designed for professional commodity traders',
      note: '⚠️ Stratoma Interchange only accepts bankable ICPO with complete KYC documentation',
      steps: [
        {
          title: 'ICPO + KYC',
          description: 'Submit Irrevocable Corporate Purchase Order with complete Know Your Customer documentation including bank comfort letter.',
        },
        {
          title: 'NCNDA/IMFPA',
          description: 'Execute Non-Circumvention, Non-Disclosure Agreement and International Master Fee Protection Agreement.',
        },
        {
          title: 'Sales & Purchase Agreement',
          description: 'Sign SPA with complete commercial terms, delivery schedule, and payment conditions.',
        },
        {
          title: 'Proof of Product',
          description: 'Receive Soft Corporate Offer (SCO), Proof of Product, and SGS inspection report for verification.',
        },
        {
          title: 'Payment Instrument',
          description: 'Activate SBLC (Standby Letter of Credit) or DLC (Documentary Letter of Credit) for secure transaction.',
        },
      ],
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Ready to discuss your commodity trading requirements? Contact us today.',
      form: {
        company: 'Company Name',
        role: 'Your Role',
        selectRole: 'Select your role...',
        buyer: 'Buyer',
        seller: 'Seller',
        mandate: 'Mandate/Broker',
        email: 'Email Address',
        product: 'Product of Interest',
        inquiry: 'Your Inquiry',
        submit: 'Submit Inquiry',
      },
    },
    footer: {
      tagline: 'Your trusted partner in global commodities trading',
      contact: {
        title: 'Contact',
      },
      legal: {
        title: 'Legal Notice',
        notice: 'Stratoma Interchange is a trading name operated by Ribon Real Estate Services SL. Registered in Spain. All transactions subject to our terms and conditions.',
      },
      rights: 'All rights reserved.',
    },
  },
  es: {
    nav: {
      products: 'Productos',
      blog: 'Blog',
      faq: 'FAQ',
      about: 'Acerca de',
      process: 'Proceso',
      contact: 'Contacto',
    },
    hero: {
      title: 'Excelencia en Comercio Global de Commodities',
      subtitle: 'Intermediario premium para comercio internacional de Urea 46% y derivados petroquímicos. Construyendo cadenas de suministro confiables entre continentes.',
      cta: 'Comenzar a Operar',
    },
    products: {
      title: 'Nuestros Productos Principales',
      subtitle: 'Commodities de calidad premium con especificaciones certificadas',
      urea: {
        title: 'Urea 46% Perlada y Granular',
        form: 'Forma',
        nitrogen: 'Contenido de Nitrógeno',
        moisture: 'Humedad',
        biuret: 'Biuret',
      },
      standards: {
        title: 'Garantía de Calidad',
        quality: 'Gestión de calidad certificada ISO 9001:2015',
        inspection: 'Inspección de terceros SGS/Bureau Veritas',
        certification: 'Trazabilidad completa y certificación',
      },
    },
    process: {
      title: 'Nuestro Proceso Comercial',
      subtitle: 'Un flujo de trabajo optimizado y seguro diseñado para traders profesionales',
      note: '⚠️ Stratoma Interchange solo acepta ICPO bancables con documentación KYC completa',
      steps: [
        {
          title: 'ICPO + KYC',
          description: 'Enviar Orden de Compra Corporativa Irrevocable con documentación completa de Conozca a su Cliente incluyendo carta de confort bancaria.',
        },
        {
          title: 'NCNDA/IMFPA',
          description: 'Ejecutar Acuerdo de No Elusión y No Divulgación y Acuerdo Internacional de Protección de Comisiones.',
        },
        {
          title: 'Contrato de Compraventa',
          description: 'Firmar SPA con términos comerciales completos, calendario de entregas y condiciones de pago.',
        },
        {
          title: 'Prueba de Producto',
          description: 'Recibir Oferta Corporativa Suave (SCO), Prueba de Producto e informe de inspección SGS para verificación.',
        },
        {
          title: 'Instrumento de Pago',
          description: 'Activar SBLC (Carta de Crédito Stand-by) o DLC (Carta de Crédito Documentaria) para transacción segura.',
        },
      ],
    },
    contact: {
      title: 'Contáctenos',
      subtitle: '¿Listo para discutir sus requisitos de comercio de commodities? Contáctenos hoy.',
      form: {
        company: 'Nombre de la Empresa',
        role: 'Su Rol',
        selectRole: 'Seleccione su rol...',
        buyer: 'Comprador',
        seller: 'Vendedor',
        mandate: 'Mandatario/Broker',
        email: 'Correo Electrónico',
        product: 'Producto de Interés',
        inquiry: 'Su Consulta',
        submit: 'Enviar Consulta',
      },
    },
    footer: {
      tagline: 'Su socio de confianza en comercio global de commodities',
      contact: {
        title: 'Contacto',
      },
      legal: {
        title: 'Aviso Legal',
        notice: 'Stratoma Interchange es un nombre comercial operado por Ribon Real Estate Services SL. Registrado en España. Todas las transacciones sujetas a nuestros términos y condiciones.',
      },
      rights: 'Todos los derechos reservados.',
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.en;
