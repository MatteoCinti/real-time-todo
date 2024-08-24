import { Outlet } from '@tanstack/react-router';
import { BoardList } from '~/components';
import { Card } from '~/components/ui';

function Home() {
  return (
    <Card className="border-muted flex h-full w-full rounded-t-none p-0">
      {/* <CardHeader>Home</CardHeader> */}
      <Card className="border-muted m-4 h-full w-1/3">
        <BoardList />
      </Card>
      <Card className="h-1/2 w-1/2">
        <Outlet />
      </Card>
    </Card>
  );
}

export default Home;
