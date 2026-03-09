import Image from 'next/image';
import Link from 'next/link';
import { fetchProducts } from '@/lib/api';

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div>
      <h1>Productos</h1>
      <p>Catálogo demo con FakeStoreAPI.</p>
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
