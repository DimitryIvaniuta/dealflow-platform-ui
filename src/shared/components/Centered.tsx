import React from 'react';
import { Box } from '@mui/material';

export function Centered({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 180 }}>
      {children}
    </Box>
  );
}
