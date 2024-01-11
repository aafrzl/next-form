import { Button } from '@/components/ui/button';
import { useDesginerStore } from '@/store/store';
import { X } from 'lucide-react';
import React from 'react';
import { FormElements } from './FormElements';
import { Separator } from '@/components/ui/separator';

export default function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesginerStore();
  if (!selectedElement || typeof selectedElement === 'function') return null;

  const PropertiesForm = FormElements[selectedElement.type]?.propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => {
            setSelectedElement(null);
          }}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Separator className='mb-4' />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}