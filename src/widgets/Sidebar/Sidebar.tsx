import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuthStore } from '@/features/auth/authStore';

type NavItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
  requiresAnyRole?: string[];
};

const NAV: { title: string; items: NavItem[] }[] = [
  {
    title: 'Overview',
    items: [{ label: 'Dashboard', to: '/', icon: <DashboardIcon /> }]
  },
  {
    title: 'CRM',
    items: [{ label: 'Customers', to: '/customers', icon: <PeopleIcon /> }]
  },
  {
    title: 'Dealflow',
    items: [
      { label: 'Listings', to: '/listings', icon: <ListAltIcon /> },
      { label: 'Opportunities', to: '/opportunities', icon: <TrendingUpIcon /> }
    ]
  },
  {
    title: 'Administration',
    items: [
      {
        label: 'RBAC & Roles',
        to: '/admin',
        icon: <AdminPanelSettingsIcon />,
        requiresAnyRole: ['ADMIN', 'OWNER', 'AGENT']
      }
    ]
  }
];

export function Sidebar() {
  const loc = useLocation();
  const hasAnyRole = useAuthStore((s) => s.hasAnyRole);

  return (
    <Box
      sx={{
        width: 280,
        borderRight: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(15,26,46,0.7)'
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.65)' }}>
          Workspace
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
          Navigate
        </Typography>
      </Box>
      <Divider />

      {NAV.map((section) => (
        <Box key={section.title} sx={{ py: 1 }}>
          <Typography variant="overline" sx={{ px: 2, color: 'rgba(255,255,255,0.55)' }}>
            {section.title}
          </Typography>
          <List dense sx={{ px: 1 }}>
            {section.items
              .filter((it) => !it.requiresAnyRole || hasAnyRole(it.requiresAnyRole))
              .map((it) => {
                const selected = loc.pathname === it.to;
                return (
                  <ListItemButton
                    key={it.to}
                    component={RouterLink}
                    to={it.to}
                    selected={selected}
                    sx={{ borderRadius: 2, my: 0.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>{it.icon}</ListItemIcon>
                    <ListItemText primary={it.label} />
                  </ListItemButton>
                );
              })}
          </List>
        </Box>
      ))}
    </Box>
  );
}
