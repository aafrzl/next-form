import { UpdateFormContent } from '@/app/actions/form';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useDesginerStore } from '@/store/store';
import { Loader2, Save } from 'lucide-react';
import { useTransition } from 'react';

export default function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesginerStore();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);

      await UpdateFormContent(id, jsonElements);

      toast({
        title: 'Form Saved!',
        description: 'Your form has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Form Not Saved!',
        description: 'Your form has not been saved.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      variant={'secondary'}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}>
      {loading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Save className="mr-2 h-5 w-5" />
      )}
      Save
    </Button>
  );
}
