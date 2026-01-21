import React from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';

type Mode = 'password' | 'devToken';

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const setToken = useAuthStore((s) => s.setToken);

  const [mode, setMode] = React.useState<Mode>('password');

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [devToken, setDevToken] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onPasswordLogin() {
    setError(null);
    const u = username.trim();
    const p = password;
    if (!u || !p) {
      setError('Username and password are required.');
      return;
    }
    setLoading(true);
    try {
      await login(u, p);
      navigate('/');
    } catch (e: any) {
      setError(e?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  function onDevToken() {
    setError(null);
    const t = devToken.trim();
    if (!t) {
      setError('Access token is required.');
      return;
    }
    setToken(t);
    navigate('/');
  }

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Card sx={{ bgcolor: 'rgba(15,26,46,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', mb: 2 }}>
            Sign in with your Dealflow account. Dev token mode is available for local testing.
          </Typography>

          <Tabs
            value={mode}
            onChange={(_, v) => {
              setMode(v);
              setError(null);
            }}
            sx={{ mb: 2 }}
          >
            <Tab value="password" label="Username + password" />
            <Tab value="devToken" label="Dev token" />
          </Tabs>

          {error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : null}

          {mode === 'password' ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void onPasswordLogin();
                }}
              />
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button variant="contained" disabled={loading} onClick={() => void onPasswordLogin()}>
                  {loading ? 'Signing in…' : 'Sign in'}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                Paste a JWT access token (Bearer) for local testing.
              </Typography>
              <TextField
                label="Access token"
                multiline
                minRows={6}
                value={devToken}
                onChange={(e) => setDevToken(e.target.value)}
              />
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="inherit" onClick={() => setDevToken('')}>
                  Clear
                </Button>
                <Button variant="contained" onClick={onDevToken}>
                  Continue
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'rgba(255,255,255,0.6)' }}>
        Backend: set VITE_API_BASE_URL in .env (default: http://localhost:8080).
      </Typography>
    </Container>
  );
}
