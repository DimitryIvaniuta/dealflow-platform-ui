import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

export function DashboardPage() {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card><CardContent><Typography variant="h6">Customers</Typography><Typography variant="body2" sx={{ opacity: 0.7 }}>Manage customers and timeline events.</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card><CardContent><Typography variant="h6">Deals</Typography><Typography variant="body2" sx={{ opacity: 0.7 }}>Listings & opportunities workflows.</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card><CardContent><Typography variant="h6">Administration</Typography><Typography variant="body2" sx={{ opacity: 0.7 }}>RBAC and permissions management.</Typography></CardContent></Card>
        </Grid>
      </Grid>
    </>
  );
}
