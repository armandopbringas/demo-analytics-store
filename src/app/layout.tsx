import type { Metadata } from 'next';
import Link from 'next/link';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo Analytics Store',
  description: 'E-commerce demo for Digital Analytics portfolio'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <nav className="nav">
            <strong>Demo Analytics Store</strong>
            <div className="nav-links">
              <Link href="/products">Products</Link>
              <Link href="/cart">Cart</Link>
            </div>
          </nav>
          <main className="container">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
