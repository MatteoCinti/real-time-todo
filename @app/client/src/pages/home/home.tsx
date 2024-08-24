import { BoardList } from '~/components';
import { Card } from '~/components/ui';

function Home() {
  return (
    <Card className="border-muted flex h-full w-full flex-col rounded-t-none p-0">
      {/* <CardHeader>Home</CardHeader> */}

      <BoardList />
    </Card>
  );
}

export default Home;
