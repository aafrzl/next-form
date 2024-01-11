'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function error({ error }: { error: Error }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Image
        width={500}
        height={500}
        src="/error-404-dark.svg"
        alt="Error 404"
        unoptimized
        className="object-contain"
      />
      <h2 className="mt-10 text-4xl font-bold text-destructive">
        Form or page not found
      </h2>
      <p className="text-sm text-gray-500">
        The form or page you are looking for is not found. Please go back to
        Dashboard.
      </p>
      <Button
        size={'lg'}
        asChild
        variant={'link'}>
        <Link href="/dashboard">Go Back To Dashboard</Link>
      </Button>
    </div>
  );
}
