'use client';

import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function VisitBtn({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant={'secondary'}
      asChild>
      <Link
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer">
        <Globe className="mr-2 h-4 w-4" />
        Visit Form
      </Link>
    </Button>
  );
}
