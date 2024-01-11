'use client';

import {
  FormElementInstance,
  FormElements,
} from '@/app/(dashboard)/_components/FormElements';
import { SubmitForm } from '@/app/actions/form';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { soria } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import reactStringReplace from 'react-string-replace';


interface Props {
  formUrl: string;
  content: FormElementInstance[];
}

export default function FormSubmitComponent({ formUrl, content }: Props) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = () => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || '';
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false
    }

    return true;
  }

  const submitValues = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const submitForm = async () => {
    formErrors.current = {};

    const validForm = validateForm();

    if (!validForm) {
      setRenderKey(new Date().getTime());

      toast({
        title: "Form is invalid",
        description: "Please fill all required fields",
        variant: 'destructive'
      })
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: 'destructive'
      })
    }
  };

  if (submitted) {
    return (
      <div className='flex h-full w-full items-center justify-center p-8'>
        <div
          key={renderKey}
          className='flex w-full max-w-[620px] grow flex-col gap-4 overflow-y-auto rounded-xl border bg-accent/50 p-8 text-center shadow-md'>
          <div className='flex flex-col gap-4'>
            <h1 className={cn(soria.className, 'text-5xl font-extrabold')}>
              {
                reactStringReplace(
                  '**Thank you** for submitting your form',
                  /\*\*(.*)\*\*/g,
                  (match, i) => (
                    <span key={i} className='word-animation'>
                      {match.split('/n').map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </span>
                  )
                )
              }
            </h1>
            <p className='text-sm'>
              Your form has been submitted successfully.
              <br />
              You can close this page now.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full w-full items-center justify-center p-8'>
      <div
        key={renderKey}
        className='flex w-full max-w-[620px] grow flex-col gap-4 overflow-y-auto rounded-xl border bg-accent/50 p-8 shadow-md'>
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitFunction={submitValues}
              isInvalid={formErrors.current[element.id]}
              defaultValues={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className='mt-8 text-zinc-50'
          onClick={() => {
            startTransition(submitForm)
          }}
        >
          {pending && (
            <Loader className='mr-2 animate-spin' />
          )}
          Submit
        </Button>
      </div>
    </div>
  );
}
