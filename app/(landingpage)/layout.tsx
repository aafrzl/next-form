import Navbar from '@/components/Navbar';
import React, { PropsWithChildren } from 'react';
import Footer from './_components/Footer';

export default function layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </>
  );
}
