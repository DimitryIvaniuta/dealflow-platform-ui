import React from 'react';
import { Typography } from '@mui/material';

export function ListingsPage() {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Listings</Typography>
      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        Placeholder UI — hook your ListingGraphQlApi operations here (listings, create/update, filters).
      </Typography>
    </>
  );
}
