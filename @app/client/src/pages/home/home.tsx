import { ErrorComponent } from '~/components';
import { Card, CardHeader } from '~/components/ui';
import { useUser } from '~/lib/react-query';

function Home() {
  const { isError: userFetchError } = useUser();

  if (userFetchError) {
    return <ErrorComponent />;
  }
  return (
    <Card className="border-muted pb-optical-center flex h-full w-full flex-col lg:rounded-t-none">
      <CardHeader>Home</CardHeader>
    </Card>
  );
}

export default Home;
