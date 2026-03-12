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
          src="https://images.unsplash.com/photo-1674505613923-98085d3712fd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D"
          alt="Editorial moda"
          width={1200}
          height={680}
          priority
        />
        <div className="hero-overlay">
          <p className="hero-kicker">Nueva colección</p>
          <h1>Estilo urbano para la temporada</h1>
          <p>Descubre piezas esenciales con cortes modernos y paleta neutral.</p>
        </div>
      </section>

      <h2 id="catalogo" className="section-title">Nuevas llegadas</h2>
      <div className="filters">
      <p>Catálogo demo con DummyJSON.</p>
      </div>
      {errorMessage && (
        <div className="notice">
          No pudimos cargar el catálogo desde DummyJSON. Intenta recargar.
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
          <span>Editorial</span>
          <h3>Looks que elevan tu día</h3>
          <p>Texturas suaves y capas ligeras para un estilo effortless.</p>
          <button className="button secondary">Ver colección</button>
        </div>
        <div className="promo-card">
          <span>Destacado</span>
          <h3>Esenciales urbanos</h3>
          <p>Prendas atemporales que combinan con todo.</p>
          <button className="button secondary">Explorar</button>
        </div>
        <div className="promo-card">
          <span>Oferta</span>
          <h3>Hasta 50% en básicos</h3>
          <p>Renueva tu armario con descuentos limitados.</p>
          <button className="button secondary">Comprar</button>
        </div>
      </section>
    </div>
  );
}
