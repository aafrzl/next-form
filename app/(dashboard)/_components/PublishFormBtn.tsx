import { PublishForm } from '@/app/actions/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Globe, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function PublishFormBtn({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setTransition] = useTransition();

  async function publishForm() {
    try {
      // Publish form
      await PublishForm(id)
      toast({
        title: 'Success',
        description: 'Your form has been published.',
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-zinc-50">
          <Globe className="h-5 w-5" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will make your form public.
            <br />
            <br />
            <span className="font-medium">
              After publishing, you can share your form by sending the link to
              your respondents and you will be able to collect responses from
              your audience.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="text-zinc-50"
            disabled={loading}
            onClick={() => {
              setTransition(publishForm);
            }}>
            {loading && <Loader2 className='mr-2 h-5 w-5 animate-spin' />}
            Publish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
