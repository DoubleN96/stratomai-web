#!/usr/bin/env node

/**
 * Script para generar las claves JWT de Supabase
 *
 * Uso:
 *   node scripts/generate-supabase-keys.js <JWT_SECRET>
 *
 * O si no proporcionas un JWT_SECRET, se generará uno automáticamente.
 */

const crypto = require('crypto');

// Función para generar JWT manualmente (sin dependencias externas)
function generateJWT(payload, secret, expiresIn = '10y') {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  // Calcular timestamp de expiración
  const now = Math.floor(Date.now() / 1000);
  let exp;

  if (expiresIn.endsWith('y')) {
    const years = parseInt(expiresIn);
    exp = now + (years * 365 * 24 * 60 * 60);
  } else if (expiresIn.endsWith('d')) {
    const days = parseInt(expiresIn);
    exp = now + (days * 24 * 60 * 60);
  } else {
    exp = now + parseInt(expiresIn);
  }

  const fullPayload = {
    ...payload,
    iat: now,
    exp: exp
  };

  // Codificar en Base64URL
  const base64UrlEncode = (obj) => {
    return Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(fullPayload);

  // Crear firma
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signatureInput)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Obtener JWT_SECRET del argumento o generar uno nuevo
const jwtSecret = process.argv[2] || crypto.randomBytes(32).toString('base64');

console.log('=================================================');
console.log('  SUPABASE CONFIGURATION KEYS');
console.log('=================================================\n');

console.log('📝 Copia estas variables a tu archivo .env.supabase:\n');

console.log(`JWT_SECRET=${jwtSecret}`);
console.log(`SECRET_KEY_BASE=${crypto.randomBytes(32).toString('base64')}`);
console.log(`POSTGRES_PASSWORD=${crypto.randomBytes(16).toString('hex')}`);
console.log();

// Generar tokens
const anonKey = generateJWT({ role: 'anon' }, jwtSecret);
const serviceRoleKey = generateJWT({ role: 'service_role' }, jwtSecret);

console.log(`SUPABASE_ANON_KEY=${anonKey}`);
console.log();
console.log(`SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}`);
console.log();

console.log('=================================================');
console.log('✅ Claves generadas exitosamente');
console.log('=================================================\n');

console.log('⚠️  IMPORTANTE: Guarda estas claves de forma segura.');
console.log('   NO las compartas ni las subas a control de versiones.\n');
