import { CasoUso } from '@/components/casos-uso/CasoUso';
import { metadataCaso } from '@/lib/casos-uso/casos';

export const metadata = metadataCaso('ia-marketing');

export default function Page() {
  return <CasoUso slug="ia-marketing" />;
}
