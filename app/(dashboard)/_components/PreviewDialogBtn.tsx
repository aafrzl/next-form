import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useDesginerStore } from '@/store/store';
import { EyeIcon } from 'lucide-react';
import React from 'react';
import { FormElements } from './FormElements';

export default function PreviewDialogBtn() {
  const { elements } = useDesginerStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="gap-2">
          <EyeIcon className="h-5 w-5" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-screen max-h-screen w-screen max-w-full grow flex-col gap-0 p-0">
        <div className="border-b px-4 py-2">
          <p className="text-xl font-bold">Form Preview</p>
          <p className="text-sm text-muted-foreground">
            This is what your form will look like to your users.
          </p>
        </div>
        <div className="flex grow flex-col items-center justify-center overflow-y-auto bg-accent bg-paper-pattern p-4 dark:bg-paper-pattern-dark">
          <div className='flex h-full w-full max-w-[650px] grow flex-col gap-4 rounded-2xl bg-background p-8'>
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;

              return (
                <FormComponent
                  key={element.id}
                  elementInstance={element}
                />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
