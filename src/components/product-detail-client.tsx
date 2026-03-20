'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useCart } from '@/lib/cart-context';
import { trackAddToCart, trackViewItem } from '@/lib/analytics';
import type { Product } from '@/lib/types';

export function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const viewedIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (viewedIdRef.current === product.id) return;
    viewedIdRef.current = product.id;
    // Tracking: view_item
    trackViewItem(product);
  }, [product]);

  const handleAdd = () => {
    addToCart(product, 1);
    // Tracking: add_to_cart
    trackAddToCart(product, 1);
  };

  return (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
      <div className="card">
        <Image src={product.image} alt={product.title} width={420} height={420} />
      </div>
      <div className="card">
        <h1>{product.title}</h1>
        <div className="price">${product.price.toFixed(2)}</div>
        <p>{product.description}</p>
        <button
          className="button"
          onClick={handleAdd}
          data-gtm="add_to_cart"
          data-item_id={product?.id ?? ''}
          data-item_name={product?.title ?? ''}
          data-price={product?.price ?? ''}
          data-currency="USD"
          data-quantity="1"
        >
          Agregar al carrito
        </button>
        <button className="button secondary" onClick={() => router.back()}>Regresar</button>
      </div>
    </div>
  );
}
