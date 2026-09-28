import { CasoUso } from '@/components/casos-uso/CasoUso';
import { metadataCaso } from '@/lib/casos-uso/casos';

export const metadata = metadataCaso('ia-rrhh');

export default function Page() {
  return <CasoUso slug="ia-rrhh" />;
}
