'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/lib/cart-context';

const LAST_EVENT_KEY = 'last_analytics_event';
const EVENTS_LIST_KEY = 'analytics_events';

type LastEvent = {
  event_name: string;
  params: Record<string, unknown>;
  ts: string;
};

export default function DebugPage() {
  const { items, itemsCount, subtotal, clearCart } = useCart();
  const [lastEvent, setLastEvent] = useState<LastEvent | null>(null);
  const [events, setEvents] = useState<LastEvent[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadFromStorage = () => {
      const raw = window.localStorage.getItem(LAST_EVENT_KEY);
      if (raw) {
        try {
          setLastEvent(JSON.parse(raw));
        } catch {
          setLastEvent(null);
        }
      } else {
        setLastEvent(null);
      }

      const listRaw = window.localStorage.getItem(EVENTS_LIST_KEY);
      if (listRaw) {
        try {
          const parsed = JSON.parse(listRaw);
          setEvents(Array.isArray(parsed) ? parsed : []);
        } catch {
          setEvents([]);
        }
      } else {
        setEvents([]);
      }
    };

    loadFromStorage();

    const handleAnalyticsEvent = () => {
      loadFromStorage();
    };

    window.addEventListener('analytics_event', handleAnalyticsEvent);
    return () => window.removeEventListener('analytics_event', handleAnalyticsEvent);
  }, []);

  const formattedEvent = useMemo(() => {
    if (!lastEvent) return null;
    return JSON.stringify(lastEvent, null, 2);
  }, [lastEvent]);

  const handleClearEvent = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(LAST_EVENT_KEY);
    window.localStorage.removeItem(EVENTS_LIST_KEY);
    setLastEvent(null);
    setEvents([]);
  };

  return (
    <div>
      <h1>Debug</h1>
      <p>Último evento de analytics:</p>
      {formattedEvent ? (
        <pre className="summary" style={{ whiteSpace: 'pre-wrap' }}>{formattedEvent}</pre>
      ) : (
        <p className="notice">No hay eventos registrados aún. Navega el funnel para generar eventos.</p>
      )}

      <h2 style={{ marginTop: 24 }}>Historial de eventos</h2>
      {events.length === 0 ? (
        <p className="notice">No hay eventos registrados aún. Navega el funnel para generar eventos.</p>
      ) : (
        <pre className="summary" style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(events, null, 2)}
        </pre>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <button className="button secondary" onClick={handleClearEvent}>Clear last event</button>
        <button className="button secondary" onClick={clearCart} disabled={items.length === 0}>Clear cart</button>
      </div>

      <div className="summary" style={{ marginTop: 16 }}>
        <div><strong>items_count:</strong> {itemsCount}</div>
        <div><strong>value:</strong> ${subtotal.toFixed(2)}</div>
      </div>
    </div>
  );
}
