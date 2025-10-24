import React from 'react';
import './globals.css';

export const metadata = {
  title: 'FrostRook - Hello World',
  description: 'A simple Next.js Hello World application',
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
