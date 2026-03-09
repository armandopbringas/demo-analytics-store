import { Suspense } from 'react';
import { ThankYouClient } from './thank-you-client';

export default function ThankYouPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ThankYouClient />
    </Suspense>
  );
}
