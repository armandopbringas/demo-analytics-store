import Image from 'next/image';
import Link from 'next/link';
import { fetchProducts } from '@/lib/api';
import type { Product } from '@/lib/types';

export default async function ProductsPage() {
  let products: Product[] = [];
  let errorMessage: string | null = null;

  try {
    products = await fetchProducts();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Failed to load products';
  }

  return (
    <div>
      <h1>Productos</h1>
      <p>Catálogo demo con DummyJSON.</p>
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
    </div>
  );
}
