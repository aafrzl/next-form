'use client';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '@/app/(dashboard)/_components/FormElements';
import { Calendar } from 'lucide-react';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useDesginerStore } from '@/store/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '../ui/calendar';

const type: ElementsType = 'DateField';

const extraAttributes = {
  label: 'Date Field',
  helperText: 'Helper Text',
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: <Calendar className="h-8 w-8" />,
    label: 'Date Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;

    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  }
};

type propertiesType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { updateElement } = useDesginerStore();

  const { label, helperText, required } = element.extraAttributes;

  const form = useForm<propertiesType>({
    resolver: zodResolver(propertiesSchema),
    defaultValues: {
      label: label,
      helperText: helperText,
      required: required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(data: propertiesType) {
    const { label, helperText, required } = data;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-4">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the Text Field. <br /> It will be displayed above
                the input.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The helper text of the Text Field. <br /> It will be displayed
                below the input.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  Whether the Text Field is required or not.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { label, required, helperText } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="mr-2 text-foreground">
        {label}
        {required && <span className="ml-2 text-red-500">*</span>}
      </Label>
      <Button
        variant={'outline'}
        className='w-full justify-start text-left font-normal'
      >
        <Calendar className='mr-2 h-4 w-4' />
        <span>Pick a date</span>
      </Button>
      {helperText && (
        <p className="text-[.8rem] text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitFunction,
  isInvalid,
  defaultValues,
}: {
  elementInstance: FormElementInstance;
  submitFunction?: SubmitFunction;
  isInvalid?: boolean;
  defaultValues?: string;
}) {
  const element = elementInstance as CustomInstance;

  const [date, setDate] = useState<Date | undefined>(defaultValues ? new Date(defaultValues) : undefined)

  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid])

  const { label, required, helperText } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className={cn("mr-2 text-foreground", error && 'text-red-500')}>
        {label}
        {required && <span className="ml-2 text-red-500">*</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('w-full justify-start text-left font-normal',
              error && 'border-rose-500', !date && 'text-muted-foreground')}
          >
            <Calendar className='mr-2 h-4 w-4' />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);

              if (!submitFunction) return;
              const value = date?.toUTCString() || '';
              const valid = DateFieldFormElement.validate(element, value);
              setError(!valid);
              submitFunction(element.id, value);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {helperText && (
        <p className={cn("text-[.8rem] text-muted-foreground", error && ("text-rose-500"))}>{helperText}</p>
      )}
    </div>
  );
}
