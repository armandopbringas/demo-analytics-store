'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { items, itemsCount, subtotal, updateQty, removeFromCart } = useCart();

  return (
    <div>
      <h1>Carrito</h1>
      <p><strong>Productos agregados:</strong> {itemsCount}</p>
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
                  Quitar
                </button>
              </div>
            </div>
          ))}
          <div className="summary" style={{ marginTop: 16 }}>
            <div><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</div>
            <div><strong>Productos:</strong> {itemsCount}</div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        <Link href="/" className="button secondary">
          Inicio
        </Link>
        {itemsCount > 0 && (
          <Link href="/checkout" className="button">
            Ir a pago
          </Link>
        )}
      </div>
    </div>
  );
}
