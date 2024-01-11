import Navbar from '@/components/Navbar';
import React, { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen min-w-full flex-col bg-background">
        <main className="flex w-full grow">{children}</main>
      </div>
    </>
  );
}
