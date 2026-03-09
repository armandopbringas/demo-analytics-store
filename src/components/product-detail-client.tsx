'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { trackAddToCart, trackViewItem } from '@/lib/analytics';
import type { Product } from '@/lib/types';

export function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();

  useEffect(() => {
    trackViewItem(product);
  }, [product]);

  const handleAdd = () => {
    addToCart(product, 1);
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
        <button className="button" onClick={handleAdd}>Add to cart</button>
      </div>
    </div>
  );
}
