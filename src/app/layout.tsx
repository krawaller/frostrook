import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Frostrook',
  description: 'Frostrook official Website',
  keywords: ['Frostrook'],
  authors: [{ name: 'Frostrook Team' }],
  creator: 'Frostrook',
  publisher: 'Frostrook',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',

  // Open Graph metadata for social media sharing
  openGraph: {
    type: 'website',
    title: 'Frostrook',
    description: 'Frostrook official Website',
    url: 'https://frostrook.com',
    siteName: 'Frostrook',
    images: [
      {
        url: '/images/FROSTROOK-logo-black.svg',
        width: 2000,
        height: 640,
        alt: 'Frostrook Logo',
      },
    ],
    locale: 'en_US',
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Frostrook',
    description: 'Frostrook official Website',
    images: ['/images/FROSTROOK-logo-black.svg'],
    creator: '@frostrook',
  },

  // Icons and manifest
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',

  // Additional metadata
  category: 'technology',
  classification: 'Business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
