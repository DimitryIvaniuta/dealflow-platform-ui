import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { Sidebar } from '@/widgets/Sidebar/Sidebar';
import { renderWithProviders } from './testUtils';
import { useAuthStore } from '@/features/auth/authStore';

describe('Sidebar (role-aware)', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: 'a.b.c', subject: 'u', roles: [], workspaceId: null } as any);
  });

  it('hides Admin section item for VIEWER', () => {
    useAuthStore.setState({ roles: ['VIEWER'] } as any);
    renderWithProviders(<Sidebar />);
    expect(screen.queryByText(/RBAC & Roles/i)).toBeNull();
  });

  it('shows Admin section item for ADMIN', () => {
    useAuthStore.setState({ roles: ['ADMIN'] } as any);
    renderWithProviders(<Sidebar />);
    expect(screen.getByText(/RBAC & Roles/i)).toBeInTheDocument();
  });
});
