export default function AdminLogin() {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>ArtiMind · Admin Login</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" />
        <style>{`
          :root{
            --bg:#07070a;
            --bg-2:#0d0d12;
            --ink:#f2f1ec;
            --ink-dim:#a8a6a0;
            --ink-faint:#5a5952;
            --line:rgba(255,255,255,0.07);
            --neon:#ff2e2e;
            --neon-soft:rgba(255,46,46,0.35);
            --display:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;
            --sans:'Inter','Helvetica Neue',Helvetica,Arial,sans-serif;
            --ease:cubic-bezier(.2,.7,.2,1);
          }
          html[data-theme="light"]{
            --bg:#f5f3ec;
            --bg-2:#ecead f;
            --ink:#0a0a0a;
            --ink-dim:#3b3a33;
            --ink-faint:#8f8c81;
            --line:rgba(0,0,0,0.1);
            --neon:#d90000;
            --neon-soft:rgba(217,0,0,0.28);
          }

          *{box-sizing:border-box}
          html,body{margin:0;padding:0;background:var(--bg);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased}
          body{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}

          .login-box{
            width:100%;max-width:400px;padding:40px;border:1px solid var(--line);background:var(--bg-2);border-radius:12px;
          }

          .logo{
            display:flex;align-items:center;gap:10px;margin-bottom:40px;
          }
          .logo-dot{
            width:28px;height:28px;border-radius:6px;background:var(--neon);display:flex;align-items:center;justify-content:center;
            font-family:var(--display);font-weight:700;color:#fff;font-size:14px;box-shadow:0 0 20px -4px var(--neon);
          }
          .logo-txt{
            font-family:var(--display);font-weight:600;font-size:16px;letter-spacing:-.01em;
          }

          h1{
            font-family:var(--display);font-weight:600;font-size:24px;margin:0 0 12px;letter-spacing:-.01em;
          }
          .subtitle{
            color:var(--ink-dim);font-size:14px;margin:0 0 32px;
          }

          .field{margin-bottom:20px}
          .field label{display:block;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-faint);margin-bottom:8px}
          .field input{
            width:100%;padding:10px 12px;background:var(--bg);border:1px solid var(--line);color:var(--ink);
            border-radius:6px;font-family:var(--sans);font-size:14px;outline:none;transition:border .2s;
          }
          .field input:focus{border-color:var(--neon)}

          .btn{
            width:100%;padding:12px;background:var(--neon);color:#fff;border:none;border-radius:6px;
            font-family:var(--sans);font-weight:500;font-size:14px;cursor:pointer;transition:background .2s;
          }
          .btn:hover{background:#ff4848}
          .btn:disabled{opacity:.5;cursor:not-allowed}

          .message{
            margin-top:16px;padding:12px;border-radius:6px;font-size:13px;text-align:center;
            display:none;
          }
          .message.success{
            background:rgba(74,222,128,.1);color:#4ade80;border:1px solid rgba(74,222,128,.3);
          }
          .message.error{
            background:rgba(239,68,68,.1);color:#ef4444;border:1px solid rgba(239,68,68,.3);
          }
          .message.show{display:block}

          .info{
            background:var(--bg);padding:12px;border-radius:6px;font-size:12px;color:var(--ink-dim);line-height:1.5;
            border:1px solid var(--line);margin-top:24px;
          }
          .info strong{color:var(--ink)}
        `}</style>
      </head>
      <body>
        <div className="login-box">
          <div className="logo">
            <div className="logo-dot">A</div>
            <div className="logo-txt">ArtiMind</div>
          </div>

          <h1>Admin Access</h1>
          <p className="subtitle">Login with your credentials</p>

          <form id="loginForm">
            <div className="field">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" placeholder="Enter username" required />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter password" required />
            </div>

            <button type="submit" className="btn" id="submitBtn">Login</button>
            <div className="message" id="message"></div>
          </form>

          <div className="info" style={{marginTop:'24px'}}>
            <strong>Secure login:</strong> Your credentials are verified on our secure servers.
          </div>
        </div>

        <script dangerouslySetInnerHTML={{__html: `
          const form = document.getElementById('loginForm');
          const btn = document.getElementById('submitBtn');
          const msg = document.getElementById('message');
          const usernameInput = document.getElementById('username');
          const passwordInput = document.getElementById('password');

          if (localStorage.getItem('admin_token')) {
            window.location.href = '/admin-dashboard';
          }

          form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = usernameInput.value;
            const password = passwordInput.value;
            btn.disabled = true;
            btn.textContent = 'Logging in...';
            msg.className = 'message';

            try {
              const res = await fetch('/api/admin/auth/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
              });

              const data = await res.json();

              if (res.ok && data.token) {
                localStorage.setItem('admin_token', data.token);
                msg.textContent = '✓ Login successful! Redirecting...';
                msg.className = 'message show success';
                setTimeout(() => window.location.href = '/admin-dashboard', 1500);
              } else {
                msg.textContent = data.error || 'Invalid credentials';
                msg.className = 'message show error';
                btn.disabled = false;
                btn.textContent = 'Login';
              }
            } catch (err) {
              msg.textContent = 'Connection error. Try again.';
              msg.className = 'message show error';
              btn.disabled = false;
              btn.textContent = 'Login';
              console.error(err);
            }
          });
        `}} />
      </body>
    </html>
  );
}
