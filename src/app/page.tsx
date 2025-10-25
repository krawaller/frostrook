import React from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

async function logout() {
  'use server';
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
        {user && (
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              color: 'white',
              textAlign: 'right',
            }}
          >
            <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Welcome, {user.email}!
            </p>
            <div style={{ marginBottom: '0.5rem' }}>
              <a
                href="/things"
                style={{
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  marginRight: '0.5rem',
                  display: 'inline-block',
                }}
              >
                My Things
              </a>
            </div>
            <form action={logout} style={{ display: 'inline' }}>
              <button
                style={{
                  backgroundColor: '#333',
                  color: 'white',
                  border: '1px solid #555',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                Logout
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
