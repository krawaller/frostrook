import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <div className="container">
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '400px',
          margin: '0 auto',
          padding: '2rem',
          backgroundColor: '#111',
          borderRadius: '8px',
        }}
      >
        <h1
          style={{ textAlign: 'center', color: 'white', marginBottom: '1rem' }}
        >
          FrostRook Login
        </h1>

        <label htmlFor="email" style={{ color: 'white' }}>
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #333',
            backgroundColor: '#222',
            color: 'white',
          }}
        />

        <label htmlFor="password" style={{ color: 'white' }}>
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #333',
            backgroundColor: '#222',
            color: 'white',
          }}
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            formAction={login}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Log in
          </button>
          <button
            formAction={signup}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
