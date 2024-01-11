import { GetForm } from '@/app/actions/form';
import React from 'react';
import FormCard from './FormCard';

export default async function FormCards() {
  const form = await GetForm();

  return (
    <>
      {form.map((form) => (
        <FormCard
          key={form.id}
          form={form}
        />
      ))}
    </>
  );
}
