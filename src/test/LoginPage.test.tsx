import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPage } from '@/pages/LoginPage';
import { renderWithProviders } from './testUtils';
import { useAuthStore } from '@/features/auth/authStore';

describe('LoginPage', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, subject: null, roles: [], workspaceId: null } as any);
  });

  it('stores token on Continue', async () => {
    renderWithProviders(<LoginPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/access token/i), 'a.b.c');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(useAuthStore.getState().token).toBe('a.b.c');
  });

  it('clears token on Clear', async () => {
    useAuthStore.getState().setToken('a.b.c');
    renderWithProviders(<LoginPage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /clear/i }));
    expect(useAuthStore.getState().token).toBeNull();
  });
});
