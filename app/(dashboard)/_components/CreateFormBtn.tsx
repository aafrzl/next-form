'use client';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CreateForm } from '@/app/actions/form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { FormSchema, formSchema } from '@/schemas/form';
import { Loader, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateFormBtn() {
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormSchema) {
    try {
      const formId = await CreateForm(values);

      toast({
        title: 'Success',
        description: 'Form created successfully',
      });

      router.push(`/builder/${formId}`);

      form.reset({
        name: '',
        description: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: "Couldn't create form",
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="group flex h-[300px] w-full flex-col items-center justify-center gap-4 border border-dashed border-primary/20 hover:cursor-pointer hover:border-primary">
          <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="text-base font-bold text-muted-foreground group-hover:text-primary">
            Create New Form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Form</DialogTitle>
          <DialogDescription>This is a description</DialogDescription>
        </DialogHeader>

        {/* Form input */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Form Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Name of your form..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      rows={5}
                      placeholder="Description of your form..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {formState.errors.description?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="mt-4 w-full font-semibold text-zinc-50">
            {!form.formState.isSubmitting && <span>Create Form</span>}
            {form.formState.isSubmitting && (
              <div className="inline-flex items-center gap-2">
                <Loader className="w-5 animate-spin" />
                <span>Creating...</span>
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
