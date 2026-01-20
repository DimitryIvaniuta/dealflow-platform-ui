import React from 'react';
import { Box } from '@mui/material';

type Props = {
  value: unknown;
  maxHeight?: number;
};

export function JsonBlock({ value, maxHeight = 320 }: Props) {
  return (
    <Box
      component="pre"
      sx={{
        maxHeight,
        overflow: 'auto',
        p: 2,
        m: 0,
        borderRadius: 2,
        background: 'rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.08)',
        fontSize: 12,
        lineHeight: 1.4
      }}
    >
      {JSON.stringify(value, null, 2)}
    </Box>
  );
}
