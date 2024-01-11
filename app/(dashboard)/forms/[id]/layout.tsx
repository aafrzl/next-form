import React, { PropsWithChildren } from 'react';

export default function LayoutForms({ children }: PropsWithChildren) {
  return <div className="mx-auto flex w-full grow flex-col">{children}</div>;
}
