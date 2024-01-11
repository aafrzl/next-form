import FormBuilder from '@/app/(landingpage)/_components/FormBuilder';
import { GetFormById } from '@/app/actions/form';
import React from 'react';

export default async function BuilderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error('Form not found');
  }

  return <FormBuilder form={form} />;
}
