import { Button } from '@/components/ui/button';
import { soria } from '@/lib/fonts';
import { cta } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import reactStringReplace from 'react-string-replace';


export default function CallToAction() {
  return (
    <section className="mx-auto mt-10 max-w-xl px-6 py-24 text-center">
      <div className='flex flex-col items-center justify-center rounded-xl border border-border p-10 shadow-xl'>
        <h2 className={cn(soria.className, "text-4xl font-semibold sm:text-6xl")}>
          {reactStringReplace(cta.heading, /\*\*(.*)\*\*/g, (match, i) => (
            <span key={i} className='word-animation'>{match}</span>
          ))}
        </h2>
        <p className='mt-4 text-muted-foreground'>
          Next Form is open source and available on Github.
        </p>
        <Button
          asChild
          color='primary'
          size={'lg'}
          variant={'outline'}
          className='mt-4'>
          <Link href={'https://github.com/aafrzl/next-form'} target='_blank'>
            Github Repo
          </Link>
        </Button>
      </div>
    </section>
  )
}
