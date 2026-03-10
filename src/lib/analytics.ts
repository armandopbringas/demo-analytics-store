import type { CartSummary, OrderSummary, Product } from './types';

const LAST_EVENT_KEY = 'last_analytics_event';
const EVENTS_LIST_KEY = 'analytics_events';
const CURRENCY = 'USD';

type AnalyticsEvent = {
  event_name: 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase';
  params: Record<string, unknown>;
};

function logEvent(event: AnalyticsEvent) {
  const payload = { ...event, ts: new Date().toISOString() };
  console.log('[analytics]', payload);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LAST_EVENT_KEY, JSON.stringify(payload));
    try {
      const raw = window.localStorage.getItem(EVENTS_LIST_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const next = Array.isArray(list) ? [...list, payload] : [payload];
      window.localStorage.setItem(EVENTS_LIST_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('analytics_event', { detail: payload }));
    } catch {
      // ignore storage errors
    }
  }
}

export function trackViewItem(product: Product) {
  logEvent({
    event_name: 'view_item',
    params: {
      item_id: product.id,
      item_name: product.title,
      price: product.price,
      currency: CURRENCY
    }
  });
}

export function trackAddToCart(product: Product, qty: number) {
  logEvent({
    event_name: 'add_to_cart',
    params: {
      item_id: product.id,
      item_name: product.title,
      price: product.price,
      quantity: qty,
      currency: CURRENCY
    }
  });
}

export function trackBeginCheckout(cartSummary: CartSummary) {
  logEvent({
    event_name: 'begin_checkout',
    params: {
      value: cartSummary.subtotal,
      currency: CURRENCY,
      items_count: cartSummary.items_count
    }
  });
}

export function trackPurchase(orderSummary: OrderSummary) {
  logEvent({
    event_name: 'purchase',
    params: {
      transaction_id: orderSummary.order_id,
      value: orderSummary.total,
      currency: CURRENCY,
      items_count: orderSummary.items_count
    }
  });
}
