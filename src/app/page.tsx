import Image from 'next/image';
import Link from 'next/link';
import { fetchProducts } from '@/lib/api';
import type { Product } from '@/lib/types';

const PAGE_SIZE = 12;

export default async function HomePage({ searchParams }: { searchParams?: { page?: string } }) {
  let products: Product[] = [];
  let errorMessage: string | null = null;
  let total = 0;
  let page = Number(searchParams?.page ?? '1');
  if (!Number.isFinite(page) || page < 1) page = 1;

  try {
    const { products: list, total: totalCount } = await fetchProducts(PAGE_SIZE, (page - 1) * PAGE_SIZE);
    products = list;
    total = totalCount;
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Failed to load products';
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (page > totalPages) page = totalPages;

  return (
    <div>
      <section className="hero hero-full hero-full-bleed">
        <Image
          className="hero-image"
          src="https://i.pinimg.com/1200x/7a/b5/0d/7ab50d17b4173cbe17c8c89c970b0cd6.jpg"
          alt="Editorial moda"
          width={1200}
          height={680}
          priority
        />
        <div className="hero-overlay">
          <p className="hero-kicker">Sports Demo Store</p>
          <h1>Artículos deportivos listos para tu storefront demo</h1>
          <p>Catálogo montado sobre DummyJSON con foco en accesorios para entrenamiento, running y gimnasio.</p>
        </div>
      </section>

      <h2 id="catalogo" className="section-title">Accesorios deportivos</h2>
      <div className="filters">
        <p>Fuente: DummyJSON</p>
        <p>Categoría: sports-accessories</p>
        <p>{total || products.length} productos demo</p>
      </div>
      {errorMessage && (
        <div className="notice">
          No pudimos cargar el catálogo deportivo desde DummyJSON. Intenta recargar.
        </div>
      )}
      <div className="grid">
        {products.map(product => (
          <Link key={product.id} href={`/products/${product.id}`} className="card">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
            />
            <div>
              <div>{product.title}</div>
              <div className="card-meta">Entrenamiento y performance</div>
              <div className="price">${product.price.toFixed(2)}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
        <Link
          href={`/?page=${Math.max(1, page - 1)}`}
          className={`button secondary ${page <= 1 ? 'disabled' : ''}`}
          aria-disabled={page <= 1}
        >
          Anterior
        </Link>
        <span style={{ alignSelf: 'center' }}>
          Página {page} de {totalPages}
        </span>
        <Link
          href={`/?page=${Math.min(totalPages, page + 1)}`}
          className={`button secondary ${page >= totalPages ? 'disabled' : ''}`}
          aria-disabled={page >= totalPages}
        >
          Siguiente
        </Link>
      </div>

      <section className="promo-grid">
        <div className="promo-card">
          <span>Training</span>
          <h3>Equipo ligero para sesiones intensas</h3>
          <p>Una vitrina simple para probar browsing, clicks a PDP y eventos de add to cart.</p>
          <Link href="/#catalogo" className="button secondary">Ver catálogo</Link>
        </div>
        <div className="promo-card">
          <span>Running</span>
          <h3>Listado paginado para flujos demo</h3>
          <p>Útil para validar navegación, checkout y tracking sobre un set corto y consistente.</p>
          <Link href="/cart" className="button secondary">Ir al carrito</Link>
        </div>
        <div className="promo-card">
          <span>Analytics</span>
          <h3>Base limpia para instrumentación</h3>
          <p>Los productos quedan normalizados para `view_item`, `add_to_cart` y el flujo completo de compra.</p>
          <Link href="/checkout" className="button secondary">Probar checkout</Link>
        </div>
      </section>
    </div>
  );
}
