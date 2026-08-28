#!/usr/bin/env node
// Write a blog post with Claude and append it to content/blog/posts.json.
//
//   node scripts/write-post.mjs "cómo automatizar la atención al cliente con IA"
//   node scripts/write-post.mjs --check          # validation self-check, no network
//
// Claude returns the post as JSON so nothing has to be parsed out of prose.
// Idempotent by slug: an existing slug is replaced, not duplicated.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS = join(ROOT, 'content/blog/posts.json');

const PROMPT = (topic, existingSlugs) => `Escribe un post para el blog de Stratoma AI
(stratomai.com), agencia de automatización con IA en Madrid. Público: dueños de PYME
y responsables de operaciones en España, no técnicos.

Tema: ${topic}

Devuelve SOLO un objeto JSON, sin markdown alrededor, con estas claves exactas:
{
  "slug": "kebab-case en español, sin acentos",
  "title": "titular concreto, 50-65 caracteres",
  "description": "meta description, 140-158 caracteres",
  "content": "el post en markdown, 900-1400 palabras, empezando por un H1 (#).
      Estructura con H2. Incluye un ejemplo numérico real (horas o euros ahorrados),
      una tabla comparativa cuando aporte, y cierra con una llamada a la acción
      hacia la consultoría gratuita de stratomai.com/consultoria",
  "author": "Stratoma AI",
  "publishDate": "YYYY-MM-DD de hoy",
  "category": "una de: Automatización, Chatbots, Casos de uso, Guías",
  "tags": ["4-6 tags en español"],
  "readingTime": minutos como número entero,
  "image": { "url": "una URL de images.unsplash.com relevante", "alt": "texto alt en español" }
}

Reglas: español de España, tono directo y concreto, cero relleno de agencia
("en el mundo actual", "revolucionar"). Nada de cifras inventadas presentadas como
estudios: si das un número, preséntalo como ejemplo de cálculo, no como dato de mercado.
Slugs ya publicados que NO puedes repetir: ${existingSlugs.join(', ') || '(ninguno)'}`;

const REQUIRED = ['slug', 'title', 'description', 'content', 'author', 'publishDate',
  'category', 'tags', 'readingTime', 'image'];

export function validate(post) {
  for (const key of REQUIRED) {
    if (post[key] === undefined || post[key] === null || post[key] === '') {
      throw new Error(`missing field: ${key}`);
    }
  }
  if (!/^[a-z0-9-]+$/.test(post.slug)) throw new Error(`bad slug: ${post.slug}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.publishDate)) throw new Error(`bad date: ${post.publishDate}`);
  if (!Array.isArray(post.tags) || post.tags.length === 0) throw new Error('tags must be a non-empty array');
  if (typeof post.readingTime !== 'number') throw new Error('readingTime must be a number');
  if (!post.content.trim().startsWith('#')) throw new Error('content must start with an H1');
  // Only images.unsplash.com is allowed by next.config.ts remotePatterns; anything
  // else renders as a broken image in production instead of failing the build.
  if (!/^https:\/\/images\.unsplash\.com\//.test(post.image?.url || '')) {
    throw new Error(`image.url must be on images.unsplash.com: ${post.image?.url}`);
  }
  if (!post.image.alt) throw new Error('image.alt is required');
  return post;
}

function extractJson(raw) {
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error(`no JSON in Claude's answer:\n${raw.slice(0, 400)}`);
  return JSON.parse(raw.slice(start, end + 1));
}

export function upsert(posts, post) {
  const rest = posts.filter((p) => p.slug !== post.slug);
  return [post, ...rest].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

function selfCheck() {
  const ok = {
    slug: 'automatizar-atencion-cliente', title: 't', description: 'd',
    content: '# hola\n\ntexto', author: 'Stratoma AI', publishDate: '2026-08-28',
    category: 'Automatización', tags: ['ia'], readingTime: 7,
    image: { url: 'https://images.unsplash.com/photo-1', alt: 'a' },
  };
  validate(ok);
  const bad = (patch, why) => {
    try { validate({ ...ok, ...patch }); } catch { return; }
    throw new Error(`validate() should have rejected ${why}`);
  };
  bad({ slug: 'Con Mayusculas' }, 'a bad slug');
  bad({ publishDate: '28/08/2026' }, 'a bad date');
  bad({ image: { url: 'https://evil.example/x.png', alt: 'a' } }, 'a foreign image host');
  bad({ content: 'sin encabezado' }, 'content without an H1');
  bad({ readingTime: '7' }, 'readingTime as a string');

  const older = { ...ok, slug: 'viejo', publishDate: '2026-01-01' };
  const merged = upsert([older, ok], { ...ok, title: 'nuevo' });
  if (merged.length !== 2) throw new Error('upsert duplicated a slug');
  if (merged[0].title !== 'nuevo') throw new Error('upsert did not replace by slug');
  if (merged[1].slug !== 'viejo') throw new Error('upsert did not sort newest first');
  console.log('self-check ok');
}

function main() {
  const args = process.argv.slice(2);
  if (args[0] === '--check') return selfCheck();

  const topic = args.join(' ').trim();
  if (!topic) {
    console.error('usage: node scripts/write-post.mjs "<tema del post>"');
    process.exit(2);
  }

  const posts = JSON.parse(readFileSync(POSTS, 'utf8'));
  const raw = execFileSync('claude', ['-p', PROMPT(topic, posts.map((p) => p.slug))], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    timeout: 10 * 60 * 1000,
  });

  const post = validate(extractJson(raw));
  writeFileSync(POSTS, JSON.stringify(upsert(posts, post), null, 2) + '\n');
  console.log(`wrote /blog/${post.slug} — "${post.title}"`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
