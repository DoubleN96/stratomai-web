import { CasoUso } from '@/components/casos-uso/CasoUso';
import { metadataCaso } from '@/lib/casos-uso/casos';

export const metadata = metadataCaso('chatbot-whatsapp');

export default function Page() {
  return <CasoUso slug="chatbot-whatsapp" />;
}
