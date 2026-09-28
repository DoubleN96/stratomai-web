-- 021 — Escaparate público de QIU: vídeos y capturas que se ven en /qiu, /qiu/novedades y /casos-uso.
--
-- POR QUÉ UNA TABLA Y NO FICHEROS EN EL REPO
--   Marcelino (28/09): «que esto se vaya actualizando sacando features». Cada función nueva trae su
--   vídeo y sus capturas; si vivieran en public/ cada una costaría un PR y un despliegue. Aquí basta
--   con subirlas (scripts/publicar-media.mjs) y las páginas las recogen solas en ≤5 min (ISR).
--
-- CÓMO SE LEE UNA FILA
--   tipo       'video' | 'imagen'
--   formato    'movil' (vertical) | 'escritorio' (apaisado)
--   par        clave que une la versión móvil y la de escritorio de LA MISMA pieza. La página enseña
--              una u otra según la pantalla. Sin par, la fila va sola.
--   categoria  'hero' (vídeo principal de /qiu) | 'caso-de-uso' | 'funcionalidad'
--   feature    nombre de la función, para agrupar la galería («Correo», «Agenda»…)
--   fecha      cuándo salió; /qiu/novedades agrupa por aquí, lo más nuevo arriba
--   url        ruta RELATIVA al sitio, /media/<objeto>. next.config.ts la reescribe al bucket, así el
--              HTML público nunca lleva el host interno de Supabase.
--   publicado  false = retirada sin borrar nada (update ... set publicado = false).
--
-- SEGURIDAD
--   Todo lo que entra aquí es PÚBLICO. anon solo LEE filas publicadas; escribir, solo service role
--   (el script). El bucket es público de lectura y no tiene políticas de escritura: tampoco anon ni
--   authenticated pueden subir nada.
--
-- Aplicar: psql -U postgres < este_fichero, dentro del contenedor de la base de datos.

create table if not exists public.web_media (
  id           text primary key check (id ~ '^[a-z0-9][a-z0-9-]{0,79}$'),
  tipo         text not null check (tipo in ('video', 'imagen')),
  titulo       text not null check (length(titulo) between 1 and 160),
  descripcion  text,
  feature      text,
  categoria    text not null check (categoria in ('hero', 'caso-de-uso', 'funcionalidad')),
  formato      text not null check (formato in ('movil', 'escritorio')),
  fecha        date not null default current_date,
  url          text not null check (url like '/media/%'),
  poster_url   text check (poster_url like '/media/%'),
  par          text,
  orden        int not null default 0,
  publicado    boolean not null default true,
  created_at   timestamptz not null default now()
);

-- Un par tiene como mucho una versión de cada formato.
create unique index if not exists web_media_par_formato_uq
  on public.web_media (par, formato) where par is not null;

create index if not exists web_media_categoria_fecha_idx
  on public.web_media (categoria, fecha desc) where publicado;

alter table public.web_media enable row level security;
revoke all on public.web_media from anon, authenticated;
grant select on public.web_media to anon, authenticated;

drop policy if exists web_media_leer_publicado on public.web_media;
create policy web_media_leer_publicado on public.web_media
  for select to anon, authenticated
  using (publicado);

-- Bucket público de lectura. 60 MB por fichero; solo formatos que la web sabe pintar.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('web-media', 'web-media', true, 62914560,
        array['image/webp', 'image/jpeg', 'image/png', 'video/mp4'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
