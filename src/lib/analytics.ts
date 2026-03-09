import type { CartSummary, OrderSummary, Product } from './types';

export function trackViewItem(product: Product) {
  // Stub for analytics view_item
  console.log('[analytics] view_item', { product });
}

export function trackAddToCart(product: Product, qty: number) {
  // Stub for analytics add_to_cart
  console.log('[analytics] add_to_cart', { product, qty });
}

export function trackBeginCheckout(cartSummary: CartSummary) {
  // Stub for analytics begin_checkout
  console.log('[analytics] begin_checkout', { cartSummary });
}

export function trackPurchase(orderSummary: OrderSummary) {
  // Stub for analytics purchase
  console.log('[analytics] purchase', { orderSummary });
}
