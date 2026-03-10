'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { trackBeginCheckout, trackPurchase } from '@/lib/analytics';
import { LAST_ORDER_KEY, ORDER_STORAGE_PREFIX } from '@/lib/constants';
import type { OrderSummary } from '@/lib/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemsCount, subtotal, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const beginCheckoutTrackedRef = useRef(false);
  const purchaseTrackedRef = useRef(false);

  useEffect(() => {
    if (itemsCount === 0) {
      router.replace('/cart');
      return;
    }
    if (beginCheckoutTrackedRef.current) return;
    beginCheckoutTrackedRef.current = true;
    // Tracking: begin_checkout
    trackBeginCheckout({ subtotal, items_count: itemsCount });
  }, [itemsCount, subtotal, router]);

  const isValid = useMemo(() => {
    const nameOk = name.trim().length >= 2;
    const emailOk = /.+@.+\..+/.test(email);
    return nameOk && emailOk;
  }, [name, email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setError('Completa nombre y email válidos.');
      return;
    }

    const order_id = Date.now().toString();
    const orderSummary: OrderSummary = {
      order_id,
      total: subtotal,
      items_count: itemsCount,
      items
    };

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(`${ORDER_STORAGE_PREFIX}${order_id}`, JSON.stringify(orderSummary));
      window.localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(orderSummary));
    }

    if (!purchaseTrackedRef.current) {
      purchaseTrackedRef.current = true;
      // Tracking: purchase
      trackPurchase(orderSummary);
    }
    clearCart();
    router.push(`/thank-you?order_id=${order_id}`);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div className="summary" style={{ marginBottom: 16 }}>
        <div><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</div>
        <div><strong>Items:</strong> {itemsCount}</div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name
          <input className="input" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input className="input" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        {error && <div className="notice">{error}</div>}
        <button className="button" type="submit">Complete purchase</button>
      </form>
    </div>
  );
}
