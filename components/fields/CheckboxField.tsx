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
import { CheckSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Checkbox } from '../ui/checkbox';
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
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

const type: ElementsType = 'CheckboxField';

const extraAttributes = {
  label: 'Label Field',
  helperText: 'Helper Text',
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

export const CheckBoxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: <CheckSquare className="h-8 w-8" />,
    label: 'Checkbox Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;

    if (element.extraAttributes.required) {
      return currentValue === "true"
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

  const id = element.id;

  return (
    <div className="flex items-start space-x-2">
      <Checkbox id={id} />
      <div className='grid gap-1.5 leading-none'>
        <Label htmlFor={id} className="mr-2 text-foreground">
          {label}
          {required && <span className="ml-2 text-red-500">*</span>}
        </Label>
        {helperText && (
          <p className="text-[.8rem] text-muted-foreground">{helperText}</p>
        )}
      </div>
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
  const [value, setValue] = useState<boolean>(defaultValues === "true" ? true : false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid])

  const { label, required, helperText } = element.extraAttributes;

  const id = `checkbox-${element.id}`

  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && "border-red-500")}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;

          setValue(value);
          if (!submitFunction) return;
          const stringValue = value ? "true" : "false";
          const valid = CheckBoxFieldFormElement.validate(element, stringValue);
          setError(!valid)
          submitFunction(element.id, stringValue)
        }}
      />
      <div className='grid gap-1.5 leading-none'>
        <Label htmlFor={id} className={cn(error && 'text-red-500')}>
          {label}
          {required && <span className="ml-2 text-red-500">*</span>}
        </Label>
        {helperText && (
          <p className={cn("text-[.8rem] text-muted-foreground", error && ("text-rose-500"))}>{helperText}</p>
        )}
      </div>
    </div>
  );
}
