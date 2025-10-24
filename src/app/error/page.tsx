'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <>
      {message ? (
        <div style={{ margin: '1rem 0' }}>
          <p>Error details:</p>
          <p
            style={{
              backgroundColor: '#333',
              padding: '1rem',
              borderRadius: '4px',
              marginTop: '0.5rem',
              fontFamily: 'monospace',
            }}
          >
            {message}
          </p>
        </div>
      ) : (
        <p>Sorry, something went wrong</p>
      )}
    </>
  );
}

export default function ErrorPage() {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1>Error</h1>
        <Suspense fallback={<p>Loading error details...</p>}>
          <ErrorContent />
        </Suspense>
        <p style={{ marginTop: '2rem' }}>
          <a href="/login" style={{ color: '#0070f3' }}>
            Go to Login
          </a>{' '}
          |{' '}
          <a href="/" style={{ color: '#0070f3' }}>
            Go Home
          </a>
        </p>
      </div>
    </div>
  );
}
