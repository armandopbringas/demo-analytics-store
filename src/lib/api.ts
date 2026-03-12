import { BASE_URL } from './constants';
import type { Product } from './types';

type DummyJsonProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  limit: number;
  skip: number;
};

export async function fetchProducts(limit = 30, skip = 0): Promise<ProductsResponse> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  const products: DummyJsonProduct[] = data.products ?? [];
  return {
    products: products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.thumbnail
    })),
    total: data.total ?? products.length,
    limit: data.limit ?? limit,
    skip: data.skip ?? skip
  };
}

export async function fetchProduct(id: string | number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch product');
  const product: DummyJsonProduct = await res.json();
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.thumbnail
  };
}
