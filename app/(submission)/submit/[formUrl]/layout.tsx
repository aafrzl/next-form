import Logo from '@/components/Logo';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import React, { PropsWithChildren } from 'react';

export default function LayoutSubmit({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen min-w-full flex-col bg-background">
      <nav className="flex h-[64px] items-center justify-between border-b border-border px-4 shadow-md">
        <Logo />
        <ThemeSwitcher />
      </nav>
      {children}
    </div >
  );
}
