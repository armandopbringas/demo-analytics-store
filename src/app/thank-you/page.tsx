'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ORDER_STORAGE_PREFIX } from '@/lib/constants';
import type { OrderSummary } from '@/lib/types';

export default function ThankYouPage() {
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
        <h1>Thank you</h1>
        <p>No encontramos el order_id.</p>
        <Link href="/products" className="button">Volver a productos</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Thank you!</h1>
      <p>Order ID: <strong>{orderId}</strong></p>

      {order ? (
        <div className="summary">
          <div><strong>Items:</strong> {order.items_count}</div>
          <div><strong>Total:</strong> ${order.total.toFixed(2)}</div>
          <div style={{ marginTop: 12 }}>
            <strong>Items:</strong>
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
        <Link href="/products" className="button secondary">Seguir comprando</Link>
      </div>
    </div>
  );
}
