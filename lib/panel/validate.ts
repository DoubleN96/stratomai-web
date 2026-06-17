// Tiny input validation helpers (no external deps). Fail fast, clear messages.

export function requireString(
  value: FormDataEntryValue | null,
  field: string,
  opts: { max?: number; min?: number } = {}
): string {
  if (typeof value !== 'string') {
    throw new Error(`${field} es obligatorio`);
  }
  const trimmed = value.trim();
  if (trimmed.length < (opts.min ?? 1)) {
    throw new Error(`${field} es obligatorio`);
  }
  if (opts.max && trimmed.length > opts.max) {
    throw new Error(`${field} supera el límite de ${opts.max} caracteres`);
  }
  return trimmed;
}

export function optionalString(
  value: FormDataEntryValue | null,
  field: string,
  max = 200
): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed === '') return null;
  if (trimmed.length > max) {
    throw new Error(`${field} supera el límite de ${max} caracteres`);
  }
  return trimmed;
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function requireSlug(value: FormDataEntryValue | null): string {
  const s = requireString(value, 'Slug', { max: 64 });
  if (!SLUG_RE.test(s)) {
    throw new Error(
      'El slug solo puede contener minúsculas, números y guiones (ej. mi-proyecto)'
    );
  }
  return s;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function requireEmail(value: FormDataEntryValue | null): string {
  const e = requireString(value, 'Email', { max: 254 }).toLowerCase();
  if (!EMAIL_RE.test(e)) {
    throw new Error('Email no válido');
  }
  return e;
}

// Parse a non-negative number from a form field. Empty/absent => 0.
// Rejects NaN, negatives and Infinity with a clear field-scoped message.
export function nonNegativeNumber(
  value: FormDataEntryValue | null,
  field: string,
  opts: { integer?: boolean; max?: number } = {}
): number {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (raw === '') return 0;
  // Accept comma decimals (es-ES inputs) by normalising to a dot.
  const n = Number(raw.replace(',', '.'));
  if (!Number.isFinite(n)) {
    throw new Error(`${field} debe ser un número`);
  }
  if (n < 0) {
    throw new Error(`${field} no puede ser negativo`);
  }
  if (opts.integer && !Number.isInteger(n)) {
    throw new Error(`${field} debe ser un número entero`);
  }
  const max = opts.max ?? 1_000_000_000;
  if (n > max) {
    throw new Error(`${field} supera el máximo permitido`);
  }
  return n;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Validate a YYYY-MM-DD date string and confirm it is a real calendar date.
export function requireDate(
  value: FormDataEntryValue | null,
  field = 'Fecha'
): string {
  const s = requireString(value, field, { max: 10 });
  if (!DATE_RE.test(s)) {
    throw new Error(`${field} no válida (formato AAAA-MM-DD)`);
  }
  const d = new Date(`${s}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== s) {
    throw new Error(`${field} no válida`);
  }
  return s;
}

export function requireEnum<T extends string>(
  value: FormDataEntryValue | null,
  field: string,
  allowed: readonly T[]
): T {
  const s = requireString(value, field);
  if (!allowed.includes(s as T)) {
    throw new Error(`${field} no válido`);
  }
  return s as T;
}
