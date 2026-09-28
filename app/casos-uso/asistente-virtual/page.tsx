import { CasoUso } from '@/components/casos-uso/CasoUso';
import { metadataCaso } from '@/lib/casos-uso/casos';

// Enseña capturas y vídeos de QIU (web_media): se regenera cada 5 min, como /qiu.
export const revalidate = 300;

export const metadata = metadataCaso('asistente-virtual');

export default function Page() {
  return <CasoUso slug="asistente-virtual" />;
}
