'use client';

import PreviewDialogBtn from '@/app/(dashboard)/_components/PreviewDialogBtn';
import SaveFormBtn from '@/app/(dashboard)/_components/SaveFormBtn';
import { Form } from '@prisma/client';
import React, { useEffect } from 'react';
import PublishFormBtn from './PublishFormBtn';
import Designer from '@/app/(dashboard)/_components/Designer';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';
import { useDesginerStore } from '@/store/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Copy } from 'lucide-react';
import Link from 'next/link';
import Confetti from 'react-confetti';

export default function FormBuilder({ form }: { form: Form }) {
  const { setElements } = useDesginerStore();
  const { innerWidth, innerHeight } = typeof window !== 'undefined' ? window : { innerWidth: 0, innerHeight: 0 };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
  }, [form, setElements]);

  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  const shareUrl = `${origin}/submit/${form.shareUrl}`;

  if (form.published) {
    return (
      <>
        <Confetti width={innerWidth} height={innerHeight} recycle={false} numberOfPieces={1000} />
        <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
          <h2 className="mb-10 border-b pb-2 text-center text-4xl font-bold uppercase">
            {form.name} is Published
          </h2>
          <div className="max-w-md">
            <p className="text-center text-sm">
              You can share this form with your audience and collect responses.
              <br />
              Share this form to your audience by sending the link below.
            </p>
            <div className="my-4 flex w-full flex-col items-center gap-2 border-b pb-4">
              <Input
                readOnly
                value={shareUrl}
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: 'Copied',
                    description: 'Copied to clipboard.',
                  });
                }}
                className="w-full text-zinc-50"
                size={'sm'}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <div className="flex justify-between">
              <Button
                asChild
                variant={'link'}>
                <Link href={'/dashboard'}>Go back to dashboard</Link>
              </Button>
              <Button
                asChild
                variant={'link'}>
                <Link href={`/forms/${form.id}`}>Form Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-3 border-b-2 p-4 text-xl">
          <h2 className="truncate font-semibold">
            <span className="mr-2 text-muted-foreground">Form :</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            {/* PreviewDialogBtn */}
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </div>
        </div>
        <div className="relative flex h-[200px] w-full grow items-center justify-center overflow-hidden bg-accent bg-paper-pattern dark:bg-paper-pattern-dark">
          <Designer formId={form.id} />
        </div>
      </main>
      {/* Overlay */}
      <DragOverlayWrapper />
    </DndContext>
  );
}
