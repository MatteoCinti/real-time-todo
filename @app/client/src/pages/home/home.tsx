import { Outlet } from '@tanstack/react-router';
import { BoardList } from '~/components';
import { Card } from '~/components/ui';

function Home() {
  return (
    <Card className="border-muted grid h-full w-full grid-cols-8 gap-4 overflow-y-scroll rounded-t-none p-2 lg:p-4">
      {/* <CardHeader>Home</CardHeader> */}
      <Card className="border-muted col-span-2 hidden lg:block">
        <BoardList />
      </Card>
      <Card className="border-muted col-span-full flex h-full flex-col overflow-y-scroll pb-3 lg:col-span-6 lg:ml-0">
        <Outlet />
      </Card>
    </Card>
  );
}

export default Home;
