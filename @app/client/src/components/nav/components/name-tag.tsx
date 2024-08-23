import { Eclipse } from 'lucide-react';
import { Card, CardFooter, Skeleton } from '~/components/ui';
import { useUser } from '~/lib/react-query';

function NameTag() {
  const { data, isLoading } = useUser();

  if (isLoading) {
    return (
      <Skeleton className="flex h-7 w-32 items-center pl-2">
        <Eclipse size="16" />
      </Skeleton>
    );
  }

  if (data) {
    return (
      <Card className="border-muted flex items-center justify-center text-nowrap rounded-md">
        <CardFooter className="py-1 pl-2 pr-4">
          <Eclipse size="16" className="mr-2" />
          <p>Hello&nbsp;</p>
          <span className="italic">{data.user.firstName}</span>
        </CardFooter>
      </Card>
    );
  }
}

export default NameTag;
