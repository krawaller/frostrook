import React from 'react';

export default function HomePage() {
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Hello World!</h1>
        <p className="subtitle">
          Welcome to FrostRook - A Next.js app with TypeScript, ESLint, and
          Prettier
        </p>
        <div>
          <p>🎉 Your Next.js application is running successfully!</p>
          <p>✨ This project includes:</p>
          <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
            <li>⚡ Next.js 14 with App Router</li>
            <li>🔷 TypeScript for type safety</li>
            <li>🎨 ESLint for code quality</li>
            <li>💅 Prettier for code formatting</li>
            <li>🌙 Dark mode support</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
