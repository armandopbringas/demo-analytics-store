'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { items, itemsCount, subtotal, updateQty, removeFromCart } = useCart();

  return (
    <div>
      <h1>Cart</h1>
      {itemsCount === 0 ? (
        <p className="notice">Tu carrito está vacío. Explora productos para agregar.</p>
      ) : (
        <div>
          {items.map(item => (
            <div className="cart-row" key={item.product.id}>
              <div>
                <strong>{item.product.title}</strong>
                <div>${item.product.price.toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  className="button secondary"
                  onClick={() => updateQty(item.product.id, item.qty - 1)}
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  className="button secondary"
                  onClick={() => updateQty(item.product.id, item.qty + 1)}
                >
                  +
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <div>${(item.product.price * item.qty).toFixed(2)}</div>
                <button
                  className="button secondary"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="summary" style={{ marginTop: 16 }}>
            <div><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</div>
            <div><strong>Items:</strong> {itemsCount}</div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <Link href="/checkout" className={`button ${itemsCount === 0 ? 'secondary' : ''}`}
          aria-disabled={itemsCount === 0}
          onClick={e => {
            if (itemsCount === 0) e.preventDefault();
          }}
        >
          Go to checkout
        </Link>
      </div>
    </div>
  );
}
