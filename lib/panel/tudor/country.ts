// Best-effort country inference for GHL leads. Prefer the contact's explicit
// `country` (ISO-2) when GHL has it; otherwise derive it from the phone number's
// E.164 calling-code prefix (longest match wins). Labels are Spanish (dashboard
// language). Ambiguous shared codes (+1, +7) are labeled by their dominant país.

const ISO_NAMES: Record<string, string> = {
  RO: 'Rumanía', ES: 'España', US: 'EE. UU.', CA: 'Canadá', GB: 'Reino Unido',
  UK: 'Reino Unido', FR: 'Francia', DE: 'Alemania', IT: 'Italia', PT: 'Portugal',
  NL: 'Países Bajos', BE: 'Bélgica', CH: 'Suiza', AT: 'Austria', IE: 'Irlanda',
  PL: 'Polonia', SE: 'Suecia', NO: 'Noruega', DK: 'Dinamarca', FI: 'Finlandia',
  GR: 'Grecia', CZ: 'Chequia', SK: 'Eslovaquia', HU: 'Hungría', BG: 'Bulgaria',
  HR: 'Croacia', RS: 'Serbia', SI: 'Eslovenia', UA: 'Ucrania', MD: 'Moldavia',
  RU: 'Rusia', TR: 'Turquía', MX: 'México', AR: 'Argentina', BR: 'Brasil',
  CL: 'Chile', CO: 'Colombia', PE: 'Perú', VE: 'Venezuela', EC: 'Ecuador',
  BO: 'Bolivia', PY: 'Paraguay', UY: 'Uruguay', GT: 'Guatemala', CR: 'Costa Rica',
  PA: 'Panamá', DO: 'Rep. Dominicana', IN: 'India', PK: 'Pakistán', CN: 'China',
  JP: 'Japón', KR: 'Corea del Sur', ID: 'Indonesia', PH: 'Filipinas',
  MY: 'Malasia', SG: 'Singapur', TH: 'Tailandia', VN: 'Vietnam', AU: 'Australia',
  NZ: 'Nueva Zelanda', AE: 'EAU', SA: 'Arabia Saudí', IL: 'Israel', QA: 'Catar',
  MA: 'Marruecos', DZ: 'Argelia', EG: 'Egipto', NG: 'Nigeria', ZA: 'Sudáfrica',
  KE: 'Kenia', GH: 'Ghana',
};

// Calling code -> Spanish country name. Longest prefixes first at match time.
const CALLING_CODES: Record<string, string> = {
  '+1': 'EE. UU./Canadá', '+7': 'Rusia',
  '+20': 'Egipto', '+27': 'Sudáfrica', '+30': 'Grecia', '+31': 'Países Bajos',
  '+32': 'Bélgica', '+33': 'Francia', '+34': 'España', '+36': 'Hungría',
  '+39': 'Italia', '+40': 'Rumanía', '+41': 'Suiza', '+43': 'Austria',
  '+44': 'Reino Unido', '+45': 'Dinamarca', '+46': 'Suecia', '+47': 'Noruega',
  '+48': 'Polonia', '+49': 'Alemania', '+51': 'Perú', '+52': 'México',
  '+53': 'Cuba', '+54': 'Argentina', '+55': 'Brasil', '+56': 'Chile',
  '+57': 'Colombia', '+58': 'Venezuela', '+60': 'Malasia', '+61': 'Australia',
  '+62': 'Indonesia', '+63': 'Filipinas', '+64': 'Nueva Zelanda', '+65': 'Singapur',
  '+66': 'Tailandia', '+81': 'Japón', '+82': 'Corea del Sur', '+84': 'Vietnam',
  '+86': 'China', '+90': 'Turquía', '+91': 'India', '+92': 'Pakistán',
  '+94': 'Sri Lanka', '+98': 'Irán', '+212': 'Marruecos', '+213': 'Argelia',
  '+216': 'Túnez', '+234': 'Nigeria', '+233': 'Ghana', '+254': 'Kenia',
  '+351': 'Portugal', '+352': 'Luxemburgo', '+353': 'Irlanda', '+354': 'Islandia',
  '+358': 'Finlandia', '+359': 'Bulgaria', '+370': 'Lituania', '+371': 'Letonia',
  '+372': 'Estonia', '+373': 'Moldavia', '+374': 'Armenia', '+375': 'Bielorrusia',
  '+380': 'Ucrania', '+381': 'Serbia', '+385': 'Croacia', '+386': 'Eslovenia',
  '+420': 'Chequia', '+421': 'Eslovaquia', '+852': 'Hong Kong', '+886': 'Taiwán',
  '+880': 'Bangladesh', '+961': 'Líbano', '+962': 'Jordania', '+965': 'Kuwait',
  '+966': 'Arabia Saudí', '+968': 'Omán', '+971': 'EAU', '+972': 'Israel',
  '+973': 'Baréin', '+974': 'Catar', '+593': 'Ecuador', '+591': 'Bolivia',
  '+595': 'Paraguay', '+598': 'Uruguay', '+502': 'Guatemala', '+503': 'El Salvador',
  '+504': 'Honduras', '+505': 'Nicaragua', '+506': 'Costa Rica', '+507': 'Panamá',
};

// Prefixes sorted longest-first so +351 beats +35/+3 etc.
const SORTED_PREFIXES = Object.keys(CALLING_CODES).sort(
  (a, b) => b.length - a.length
);

function matchDigits(digits: string): string | null {
  const withPlus = '+' + digits;
  for (const pref of SORTED_PREFIXES) {
    if (withPlus.startsWith(pref)) return CALLING_CODES[pref];
  }
  return null;
}

function fromPhone(phone: string): string | null {
  let p = phone.trim().replace(/[\s()\-.]/g, '');
  if (p.startsWith('00')) p = '+' + p.slice(2);
  if (!p.startsWith('+')) return null; // no country context without a prefix
  const digits = p.slice(1).replace(/\D/g, '');
  // Un-double the old /lives form's default +40 prefix. A Romanian national
  // number is 9 digits (so +40 total = 11). A "40…" number longer than that was
  // almost certainly a FOREIGN number that the old form prepended +40 onto
  // (the lead never picked a country). Strip the stray 40 and re-infer.
  if (digits.startsWith('40') && digits.length > 11) {
    const undoubled = matchDigits(digits.slice(2));
    if (undoubled) return undoubled;
  }
  return matchDigits(digits);
}

export function countryOfLead(c: {
  country?: string | null;
  phone?: string | null;
}): string {
  // Prefer the phone's E.164 prefix: GHL's `country` field is frequently the
  // sub-account's default (e.g. all "RO"), so it does not reflect the lead's
  // real origin, whereas the number the lead typed does.
  if (c.phone) {
    const byPhone = fromPhone(c.phone);
    if (byPhone) return byPhone;
  }
  const iso = (c.country ?? '').trim().toUpperCase();
  if (iso) return ISO_NAMES[iso] ?? iso;
  return 'Desconocido';
}
