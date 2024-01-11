import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { soria } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import reactStringReplace from 'react-string-replace';


const features = [
  {
    title: 'User-friendly Interface',
    description:
      'Our intuitive interface allow you to build your forms easily and quickly. You can also share your forms with your friends and manage your forms with a simple dashboard.',
  },
  {
    title: 'Customizable Forms',
    description:
      'You can customize your forms with a simple drag and drop. You can also customize your forms with a simple dashboard.',
  },
  {
    title: 'Share Your Forms',
    description:
      'You can share your forms with your friends and manage your forms with a simple dashboard.',
  },
  {
    title: 'Manage Your Forms',
    description: 'You can manage your forms with a simple dashboard.',
  },
];

const heading = '**Build, Share, and Manage** your forms'

export default function Features() {
  return (
    <section className="bg-primary-foreground py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="text-zinc-50">Key Features</Badge>
          <h2 className={cn(soria.className, "text-3xl font-extrabold tracking-wide sm:text-5xl")}>
            {reactStringReplace(heading, /\*\*(.*)\*\*/g, (match, i) => (
              <span key={i} className='word-animation'>{match}</span>
            ))}
          </h2>
          <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed">
            Next Form is a simple and powerful form builder with drag and drop feature. You can build your own forms and surveys with our easy to use drag and drop form builder.
          </p>
        </div>
        <div className="mx-auto mt-10 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="min-h-[180px]">
              <CardHeader className="text-xl font-bold">
                {feature.title}
              </CardHeader>
              <CardContent className="text-sm">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
