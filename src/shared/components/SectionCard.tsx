import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';

type Props = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function SectionCard({ title, subtitle, action, children }: Props) {
  return (
    <Card variant="outlined" sx={{ background: 'rgba(15,26,46,0.45)', borderColor: 'rgba(255,255,255,0.08)' }}>
      <CardHeader
        titleTypographyProps={{ sx: { fontWeight: 800 } }}
        subheaderTypographyProps={{ sx: { color: 'rgba(255,255,255,0.65)' } }}
        title={title}
        subheader={subtitle}
        action={action}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
