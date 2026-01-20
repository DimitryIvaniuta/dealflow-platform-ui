import React from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';

type Props = {
  title: string;
  subtitle?: string;
  crumbs?: { label: string }[];
  right?: React.ReactNode;
};

export function PageHeader({ title, subtitle, crumbs, right }: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
      <Box>
        {crumbs && crumbs.length > 0 ? (
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.65)' }}>
            {crumbs.map((c, idx) => (
              <Typography key={`${c.label}-${idx}`} variant="caption" color="inherit">
                {c.label}
              </Typography>
            ))}
          </Breadcrumbs>
        ) : null}

        <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" sx={{ mt: 0.5, color: 'rgba(255,255,255,0.7)' }}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>

      {right ? <Box sx={{ pt: 0.5 }}>{right}</Box> : null}
    </Box>
  );
}
