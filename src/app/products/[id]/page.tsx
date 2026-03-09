import { fetchProduct } from '@/lib/api';
import { ProductDetailClient } from '@/components/product-detail-client';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  return <ProductDetailClient product={product} />;
}
