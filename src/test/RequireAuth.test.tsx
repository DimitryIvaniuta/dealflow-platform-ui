import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Routes, Route } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { RequireAuth } from '@/features/auth/RequireAuth';
import { renderWithProviders } from './testUtils';
import { useAuthStore } from '@/features/auth/authStore';

function Protected() {
  return <div>protected-ok</div>;
}

function Login() {
  return <div>login-page</div>;
}

describe('RequireAuth', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, subject: null, roles: [], workspaceId: null } as any);
  });

  it('redirects to /login when no token', () => {
    renderWithProviders(
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <Protected />
            </RequireAuth>
          }
        />
      </Routes>,
      { route: '/protected' }
    );

    expect(screen.getByText('login-page')).toBeInTheDocument();
  });

  it('renders protected content when token exists', () => {
    useAuthStore.getState().setToken('a.b.c');

    renderWithProviders(
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <Protected />
            </RequireAuth>
          }
        />
      </Routes>,
      { route: '/protected' }
    );

    expect(screen.getByText('protected-ok')).toBeInTheDocument();
  });
});
