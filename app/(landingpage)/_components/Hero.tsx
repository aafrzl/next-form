'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { soria } from '@/lib/fonts';
import { hero } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { ChevronRight, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import reactStringReplace from 'react-string-replace';

export default function Hero() {
  const { isSignedIn } = useUser();

  return (
    <section className="py-10">
      <div className='flex min-h-screen flex-col items-center justify-center py-10 delay-200 duration-1000 animate-in fade-in slide-in-from-top-6'>
        <Badge className='flex items-center gap-2 text-lg font-extralight text-zinc-50'>
          Annoucing our new product
          <ChevronRight className='h-5 w-5' />
        </Badge>
        <h1 className={cn(soria.className, "lg:text-6xl xl:text-8xl mt-8 tracking-wide font-extrabold text-center text-5xl capitalize")}>
          {hero.heading.split("\n").map((line, index) => (
            <span key={index}>
              {reactStringReplace(line, /\*\*(.*)\*\*/g, (match, i) => (
                <span key={i} className='word-animation'>{match}</span>
              ))}
              <br />
            </span>
          ))}
        </h1>
        <h2 className='mx-auto mb-8 mt-6 max-w-4xl px-5 text-center sm:px-0 md:text-lg lg:text-sm'>
          Create your own forms and surveys with our easy to use drag and drop form builder.
        </h2>
        <div className='flex items-center gap-2'>
          {isSignedIn ? (
            <Button asChild>
              <Link href={'/dashboard'} className='text-zinc-50'>
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={'/dashboard'} className='text-zinc-50'>
                Get Started
              </Link>
            </Button>
          )}
          <Button asChild variant={'outline'}>
            <Link href={'https://github.com/aafrzl/next-form'} target='_blank'>
              <Github className='mr-2 h-5 w-5' />
              Star on Github
            </Link>
          </Button>
        </div>
        <div className='mt-16 flex justify-center px-5 sm:px-0'>
          <Image
            src='/form-builder-dark.png'
            width={800}
            height={400}
            alt='Form Builder'
            unoptimized
            priority
            className='block rounded-sm dark:hidden'
          />
          <Image
            src='/form-builder-light.png'
            width={800}
            height={400}
            alt='Form Builder'
            unoptimized
            priority
            className='hidden rounded-sm dark:block'
          />
        </div>
      </div>
    </section>
  );
}
