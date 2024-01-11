'use client';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '@/app/(dashboard)/_components/FormElements';
import { cn } from '@/lib/utils';
import { useDesginerStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { MenuSquare, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

const type: ElementsType = 'SelectField';

const extraAttributes = {
  label: 'Select Field',
  helperText: 'Helper Text',
  required: false,
  placeholder: 'Placeholder',
  options: [],
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  options: z.array(z.string()).default([]),
});

export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: <MenuSquare className="h-8 w-8" />,
    label: 'Select Field',
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

  const { updateElement, setSelectedElement } = useDesginerStore();

  const { label, helperText, placeholder, required, options } = element.extraAttributes;

  const form = useForm<propertiesType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onSubmit',
    defaultValues: {
      label: label,
      helperText: helperText,
      placeholder: placeholder,
      required: required,
      options: options,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(data: propertiesType) {
    const { label, helperText, placeholder, required, options } = data;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        placeholder,
        required,
        options,
      },
    });

    toast({
      title: "success",
      description: "Changes applied successfully",
    })
    setSelectedElement(null)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(applyChanges)}
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
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The placeholder of the Text Field. <br /> It will be displayed
                inside the input.
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
        <Separator />
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center justify-between'>
                <FormLabel>Options</FormLabel>
                <Button
                  variant={'outline'}
                  size={'sm'}
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue('options', field.value.concat('New Options'))
                  }}
                >
                  <Plus className='mr-2 h-5 w-5' />
                  Add Options
                </Button>
              </div>
              <div className='flex flex-col gap-2'>
                {
                  form.watch('options').map((option, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between gap-1'
                    >
                      <Input
                        placeholder=''
                        value={option}
                        onChange={(e) => {
                          field.value[index] = e.target.value;
                          field.onChange(field.value)
                        }}
                      />
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={(e) => {
                          e.preventDefault();
                          const newOptions = [...field.value];
                          newOptions.splice(index, 1);
                          field.onChange(newOptions);
                        }}
                      >
                        <X className='h-5 w-5' />
                      </Button>
                    </div>
                  ))
                }
              </div>
              <FormDescription>
                By clicking on the button you can add new options to the select field.
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
        <Separator />
        <Button type="submit" className='w-full text-zinc-50'>Apply Changes</Button>
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

  const { label, required, placeholder, helperText } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="mr-2 text-foreground">
        {label}
        {required && <span className="ml-2 text-red-500">*</span>}
      </Label>
      <Select>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
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
  const [value, setValue] = useState(defaultValues || '');
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid])

  const { label, required, placeholder, helperText, options } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className={cn("mr-2 text-foreground", error && 'text-red-500')}>
        {label}
        {required && <span className="ml-2 text-red-500">*</span>}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          setValue(value);
          if (!submitFunction) return;
          const valid = SelectFieldFormElement.validate(element, value);
          setError(!valid);
          submitFunction(element.id, value);
        }}
      >
        <SelectTrigger className={cn('w-full', error && "border-red-500")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && (
        <p className={cn("text-[.8rem] text-muted-foreground", error && ("text-rose-500"))}>{helperText}</p>
      )}
    </div>
  );
}
