'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex grow items-center gap-4">
      <Input
        value={shareUrl}
        readOnly
      />
      <Button
        variant={'secondary'}
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          toast({
            title: 'Copied to clipboard!',
            description: 'You can now paste the link anywhere you want',
          });
        }}>
        <Share2 className="mr-2 h-4 w-4" />
        Share link
      </Button>
    </div>
  );
}
