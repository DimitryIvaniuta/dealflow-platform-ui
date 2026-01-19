import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CustomersPage } from '@/pages/CustomersPage';
import { CustomerDetailPage } from '@/pages/CustomerDetailPage';
import { ListingsPage } from '@/pages/ListingsPage';
import { OpportunitiesPage } from '@/pages/OpportunitiesPage';
import { AdminPage } from '@/pages/AdminPage';
import { RequireAuth } from '@/features/auth/RequireAuth';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'customers', element: <CustomersPage /> },
      { path: 'customers/:customerId', element: <CustomerDetailPage /> },
      { path: 'listings', element: <ListingsPage /> },
      { path: 'opportunities', element: <OpportunitiesPage /> },
      { path: 'admin', element: <AdminPage /> }
    ]
  }
]);
