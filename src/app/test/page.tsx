import { createClient } from '@/utils/supabase/server';

export default async function TestPage() {
  let connectionStatus = 'Unknown';
  let error = null;
  let hasEnvVars = false;

  // Check environment variables
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  hasEnvVars = hasUrl && hasKey;

  if (hasEnvVars) {
    try {
      const { createClient } = await import('@/utils/supabase/server');
      const supabase = await createClient();

      // Try to make a simple request to test connection
      const { data, error: testError } = await supabase.auth.getSession();

      if (testError) {
        connectionStatus = 'Error';
        error = testError.message;
      } else {
        connectionStatus = 'Connected';
      }
    } catch (e) {
      connectionStatus = 'Failed';
      error = e instanceof Error ? e.message : 'Unknown error';
    }
  } else {
    connectionStatus = 'Missing Environment Variables';
  }

  return (
    <div className="container">
      <div style={{ color: 'white', textAlign: 'center', maxWidth: '600px' }}>
        <h1>Supabase Connection Test</h1>

        <div style={{ margin: '2rem 0' }}>
          <h2>Environment Variables:</h2>
          <p>
            SUPABASE_URL:{' '}
            {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
          </p>
          <p>
            SUPABASE_ANON_KEY:{' '}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
              ? '✅ Set'
              : '❌ Missing'}
          </p>
        </div>

        <div style={{ margin: '2rem 0' }}>
          <h2>Connection Status:</h2>
          <p
            style={{
              color: connectionStatus === 'Connected' ? '#00ff00' : '#ff0000',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            {connectionStatus}
          </p>
          {error && (
            <p
              style={{
                backgroundColor: '#333',
                padding: '1rem',
                borderRadius: '4px',
                fontFamily: 'monospace',
                color: '#ff6b6b',
              }}
            >
              {error}
            </p>
          )}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <a href="/login" style={{ color: '#0070f3' }}>
            Go to Login
          </a>
          {' | '}
          <a href="/" style={{ color: '#0070f3' }}>
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
