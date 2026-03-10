# Demo Analytics Store

MVP de e-commerce para portafolio de Digital Analytics. Usa Next.js (App Router) + TypeScript y DummyJSON.

## Requisitos
- Node.js 18+

## Cómo correr local
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Levantar el servidor:
   ```bash
   npm run dev
   ```
3. Abrir: `http://localhost:3000`

## Rutas
- `/` -> redirige a `/products`
- `/products`
- `/products/[id]`
- `/cart`
- `/checkout`
- `/thank-you`

## Tracking (stubs)
Archivo: `src/lib/analytics.ts`
- `trackViewItem(product)`
- `trackAddToCart(product, qty)`
- `trackBeginCheckout(cartSummary)`
- `trackPurchase(orderSummary)`

## Tracking hooks
- `/products/[id]`: `src/components/product-detail-client.tsx` (view_item, add_to_cart)
- `/checkout`: `src/app/checkout/page.tsx` (begin_checkout, purchase)

## Debug page
Ruta: `/debug`
- Muestra el último evento de analytics guardado en `localStorage` bajo la key `last_analytics_event`.
- Muestra resumen del carrito: `items_count` y `value`.
- Incluye botones para limpiar el último evento y vaciar el carrito.

## Notas
- Persistencia del carrito en `localStorage`.
- Al completar compra se genera `order_id` y se guarda un resumen de la orden en `localStorage`.
