import React from 'react';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';

export function LoginPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);
  const token = useAuthStore((s) => s.token);
  const [value, setValue] = React.useState(token ?? '');

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Card sx={{ bgcolor: 'rgba(15,26,46,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', mb: 3 }}>
            Paste your OAuth2/JWT access token. The app will send it as a Bearer token to /graphql.
          </Typography>

          <TextField
            label="Access token"
            multiline
            minRows={6}
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                setValue('');
                setToken(null);
              }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                const t = value.trim();
                if (!t) return;
                setToken(t);
                navigate('/');
              }}
            >
              Continue
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'rgba(255,255,255,0.6)' }}>
        Tip: set VITE_API_BASE_URL in .env (e.g. http://localhost:8080). For schema download/codegen you can export DF_TOKEN.
      </Typography>
    </Container>
  );
}
