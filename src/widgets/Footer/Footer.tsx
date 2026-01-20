import React from 'react';
import { Box, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        px: 3,
        py: 1.5,
        background: 'rgba(15,26,46,0.7)'
      }}
    >
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)' }}>
        Dealflow Platform © {new Date().getFullYear()} — React 19.2 + GraphQL
      </Typography>
    </Box>
  );
}
