import Link from 'next/link';
import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='flex w-full shrink-0 flex-col items-center justify-between gap-2 border-t px-4 py-6 sm:flex-row md:px-6'>
      <p className='text-xs text-foreground'>&copy; NextForm {year}. All rights reserved.</p>
      <nav className='flex gap-4'>
        <Link
          href={'/'}
          className="text-xs text-foreground hover:text-blue-500">
          Terms of Service
        </Link>
        <Link
          href={'/'}
          className="text-xs text-foreground hover:text-blue-500">
          Privacy Policy
        </Link>
      </nav>
    </footer>
  );
}
