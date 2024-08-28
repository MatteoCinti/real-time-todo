import { Eclipse } from 'lucide-react';
import ErrorComponent from '~/components/error';
import { Card, CardFooter, Skeleton } from '~/components/ui';
import { useAuth } from '~/hooks';
import { useUser } from '~/lib/react-query';
import { cn } from '~/lib/utils';

type Props = {
  className?: string;
};

function NameTag({ className }: Props) {
  const { data, isError: userFetchingError, isLoading } = useUser();
  const { guest } = useAuth();

  if (isLoading) {
    return (
      <Skeleton className="flex h-7 w-32 items-center lg:pl-2">
        <Eclipse size="16" />
      </Skeleton>
    );
  }

  if (userFetchingError && !guest) {
    return <ErrorComponent />;
  }

  return (
    <Card
      className={cn(
        'border-muted mr-8 flex items-center justify-center text-nowrap rounded-md p-0 lg:mr-0',
        className
      )}
    >
      <CardFooter className="py-1 pr-4 lg:pl-2">
        <Eclipse size="16" className="mr-2" />
        <p>Welcome&nbsp;</p>
        {data?.user.firstName && (
          <span className="italic">{data.user.firstName}</span>
        )}
        {guest && <span className="italic">dear guest</span>}
      </CardFooter>
    </Card>
  );
}

export default NameTag;
