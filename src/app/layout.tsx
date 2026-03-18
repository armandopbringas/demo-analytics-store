import type { Metadata } from 'next';
import Link from 'next/link';
import { Providers } from './providers';
import { NavCartLink } from '@/components/nav-cart-link';
import { FiShoppingBag } from 'react-icons/fi';
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
            <Link href="/" className="nav-brand">
              <FiShoppingBag size={18} />
              <strong>Demo Online Store</strong>
            </Link>
            <div className="nav-links">
              <NavCartLink />
            </div>
          </nav>
          <main className="container">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
