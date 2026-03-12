'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ORDER_STORAGE_PREFIX } from '@/lib/constants';
import type { OrderSummary } from '@/lib/types';

export function ThankYouClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    if (!orderId || typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(`${ORDER_STORAGE_PREFIX}${orderId}`);
    if (raw) setOrder(JSON.parse(raw));
  }, [orderId]);

  if (!orderId) {
    return (
      <div>
        <h1>Gracias</h1>
        <p>No encontramos el ID de la orden.</p>
        <Link href="/" className="button">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>¡Gracias por tu compra!</h1>
      <p>ID de la orden: <strong>{orderId}</strong></p>

      {order ? (
        <div className="summary">
          <div><strong>Productos:</strong> {order.items_count}</div>
          <div><strong>Total:</strong> ${order.total.toFixed(2)}</div>
          <div style={{ marginTop: 12 }}>
            <strong>Productos:</strong>
            <ul>
              {order.items.map(item => (
                <li key={item.product.id}>
                  {item.product.title} x {item.qty}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Cargando resumen...</p>
      )}

      <div style={{ marginTop: 16 }}>
        <Link href="/" className="button secondary">Regresar</Link>
      </div>
    </div>
  );
}
