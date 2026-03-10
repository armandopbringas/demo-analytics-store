import type { CartSummary, OrderSummary, Product } from './types';

const LAST_EVENT_KEY = 'last_analytics_event';
const EVENTS_LIST_KEY = 'analytics_events';
const CURRENCY = 'USD';

type AnalyticsEvent = {
  event_name: 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase';
  params: Record<string, unknown>;
};

function sendToGA(event_name: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag as ((...args: unknown[]) => void) | undefined;
  gtag?.('event', event_name, params);
}

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
  const params = {
    item_id: product.id,
    item_name: product.title,
    price: product.price,
    currency: CURRENCY
  };
  logEvent({
    event_name: 'view_item',
    params
  });
  sendToGA('view_item', params);
}

export function trackAddToCart(product: Product, qty: number) {
  const params = {
    item_id: product.id,
    item_name: product.title,
    price: product.price,
    quantity: qty,
    currency: CURRENCY
  };
  logEvent({
    event_name: 'add_to_cart',
    params
  });
  sendToGA('add_to_cart', params);
}

export function trackBeginCheckout(cartSummary: CartSummary) {
  const params = {
    value: cartSummary.subtotal,
    currency: CURRENCY,
    items_count: cartSummary.items_count
  };
  logEvent({
    event_name: 'begin_checkout',
    params
  });
  sendToGA('begin_checkout', params);
}

export function trackPurchase(orderSummary: OrderSummary) {
  const params = {
    transaction_id: orderSummary.order_id,
    value: orderSummary.total,
    currency: CURRENCY,
    items_count: orderSummary.items_count
  };
  logEvent({
    event_name: 'purchase',
    params
  });
  sendToGA('purchase', params);
}
