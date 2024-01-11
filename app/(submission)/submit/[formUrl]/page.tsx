import { FormElementInstance } from '@/app/(dashboard)/_components/FormElements';
import { GetFormContentByUrl } from '@/app/actions/form';
import FormSubmitComponent from '../../_components/FormSubmitComponent';

export default async function SubmitPage({
  params,
}: {
  params: { formUrl: string };
}) {
  const { formUrl } = params;

  const form = await GetFormContentByUrl(formUrl);

  if (!form) {
    throw new Error('Form not found');
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormSubmitComponent
      formUrl={formUrl}
      content={formContent}
    />
  );
}
