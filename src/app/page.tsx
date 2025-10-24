import React from 'react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="container">
      <div className="logo-container">
        <Image
          src="/images/FROSTROOK-logo-white.svg"
          alt="FrostRook Logo"
          width={800}
          height={200}
          className="frostrook-logo"
          priority
        />
      </div>
    </div>
  );
}
