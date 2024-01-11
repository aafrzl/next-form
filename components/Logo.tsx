import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link
      href={'/'}
      className="text-xl font-bold">
      <h1>
        Next
        <span className="ml-1 rounded-md bg-gradient-to-br from-violet-400 to-cyan-500 p-1 text-background">
          Form
        </span>
      </h1>
    </Link>
  );
}
