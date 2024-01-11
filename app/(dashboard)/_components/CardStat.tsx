import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  title: string;
  icon: React.ReactNode;
  text: string;
  value: string;
  loading: boolean;
  className?: string;
}

export default function CardStat({
  title,
  icon,
  text,
  value,
  loading,
  className,
}: Props) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {loading && (
            <Skeleton className="w-14">
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="pt-3 text-xs font-bold text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}
