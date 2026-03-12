import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Providers } from './providers';
import { GA_ID } from '@/lib/gtag';
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
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: true });
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
