import React from 'react';
import { FormElement } from './FormElements';
import { Button } from '@/components/ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

export default function SidebarBtnElement({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon } = formElement.designerBtnElement;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={'outline'}
      className={cn(
        'flex flex-col items-center gap-2 cursor-grab h-[120px] w-[120px]',
        draggable.isDragging && 'ring-2 ring-primary'
      )}
      {...draggable.attributes}
      {...draggable.listeners}>
      {icon}
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export function SidebarBtnElementOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon } = formElement.designerBtnElement;

  return (
    <Button
      variant={'outline'}
      className="flex h-[120px] w-[120px] cursor-grab flex-col items-center gap-2 opacity-50">
      {icon}
      <p className="text-xs">{label}</p>
    </Button>
  );
}
