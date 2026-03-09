import { fetchProduct } from '@/lib/api';
import { ProductDetailClient } from '@/components/product-detail-client';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  try {
    const product = await fetchProduct(params.id);
    return <ProductDetailClient product={product} />;
  } catch {
    return (
      <div>
        <h1>Producto no disponible</h1>
        <p className="notice">No pudimos cargar este producto desde DummyJSON.</p>
      </div>
    );
  }
}
