import type { Metadata } from 'next';
import Script from "next/script";
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
     {/* GTM: script (equivalente a <head>) */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MLJVGB9C');
          `,
        }}
      />
      <body>
        {/* GTM: noscript (primer hijo del body) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MLJVGB9C"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
