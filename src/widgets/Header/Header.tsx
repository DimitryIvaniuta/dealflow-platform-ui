import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';
import { WorkspaceSelector } from '@/widgets/Header/WorkspaceSelector';

export function Header() {
  const navigate = useNavigate();
  const subject = useAuthStore((s) => s.subject);
  const logout = useAuthStore((s) => s.logout);

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Dealflow
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button component={RouterLink} to="/" color="inherit">Dashboard</Button>
          <Button component={RouterLink} to="/customers" color="inherit">Customers</Button>
          <Button component={RouterLink} to="/listings" color="inherit">Listings</Button>
          <Button component={RouterLink} to="/opportunities" color="inherit">Opportunities</Button>
        </Box>

        <Box sx={{ flex: 1 }} />

        <WorkspaceSelector />

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
            {subject ?? 'user'}
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
