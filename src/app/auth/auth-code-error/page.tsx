export default function AuthCodeError() {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1>Authentication Error</h1>
        <p>Sorry, something went wrong during the authentication process.</p>
        <p>
          <a href="/login" style={{ color: '#0070f3' }}>
            Try again
          </a>
        </p>
      </div>
    </div>
  );
}
