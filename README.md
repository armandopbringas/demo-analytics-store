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

## Notas
- Persistencia del carrito en `localStorage`.
- Al completar compra se genera `order_id` y se guarda un resumen de la orden en `localStorage`.
