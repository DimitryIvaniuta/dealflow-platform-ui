import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/Header/Header';
import { Sidebar } from '@/widgets/Sidebar/Sidebar';
import { Footer } from '@/widgets/Footer/Footer';

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
