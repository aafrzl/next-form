import React, { PropsWithChildren } from 'react';

export default function LayoutSubmit({ children }: PropsWithChildren) {
  return <div className="mx-auto flex w-full grow">{children}</div>;
}
