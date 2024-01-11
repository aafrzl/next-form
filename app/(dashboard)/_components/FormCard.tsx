'use client'

import { DeleteForm } from '@/app/actions/form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Form } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { ArrowRight, Edit, Eye, Loader2, StickyNote, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function FormCard({ form }: { form: Form }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function deleteForm() {
    try {
      await DeleteForm(form.id);
      toast({
        title: 'Success',
        description: 'Form deleted successfully.'
      });

      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: "Couldn't delete form."
      })
    }
  }


  return (
    <Card className="min-h-[195px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate text-xl font-bold">{form.name}</span>
          {form.published && <Badge className='text-zinc-50'>Published</Badge>}
          {!form.published && <Badge variant={'destructive'}>Draft</Badge>}
        </CardTitle>
        <CardDescription>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <StickyNote className="h-4 w-4 text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || 'No description provided'}
      </CardContent>
      <CardFooter className='flex-col gap-2'>
        {form.published && (
          <Button
            asChild
            className="mt-2 w-full gap-4 text-sm text-zinc-50">
            <Link href={`/forms/${form.id}`}>
              View submissions <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            asChild
            className="mt-2 w-full gap-4 text-sm text-zinc-50">
            <Link href={`/builder/${form.id}`}>
              Edit Form <Edit className="h-4 w-4" />
            </Link>
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={'destructive'}
              className='w-full items-center gap-4'
            >
              Delete
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this form?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  startTransition(() => {
                    deleteForm();
                  });
                }}
                className='bg-rose-500 text-zinc-50 hover:bg-rose-600'
              >
                {loading && <Loader2 className='mr-2 animate-spin' />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card >
  );
}
