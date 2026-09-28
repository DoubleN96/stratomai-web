import { CasoUso } from '@/components/casos-uso/CasoUso';
import { metadataCaso } from '@/lib/casos-uso/casos';

export const metadata = metadataCaso('automatizacion-procesos');

export default function Page() {
  return <CasoUso slug="automatizacion-procesos" />;
}
