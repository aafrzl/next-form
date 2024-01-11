import React, { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      {children}
    </main>
  );
}
