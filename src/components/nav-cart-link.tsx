'use client';

import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/lib/cart-context';

export function NavCartLink() {
  const { itemsCount } = useCart();

  return (
    <Link href="/cart" className="cart-link">
      <FiShoppingCart size={18} />
      <span>Carrito</span>
      <span className="cart-badge">{itemsCount}</span>
    </Link>
  );
}
