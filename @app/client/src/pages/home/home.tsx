import { Outlet } from '@tanstack/react-router';
import { BoardList } from '~/components';
import { Card, Toaster } from '~/components/ui';

function Home() {
  return (
    <Card className="border-muted grid h-full w-full grid-cols-8 gap-4 rounded-t-none p-0">
      {/* <CardHeader>Home</CardHeader> */}
      <Card className="border-muted col-span-2 my-4 ml-4">
        <BoardList />
      </Card>
      <Card className="border-muted col-span-6 my-4 mr-4 flex flex-col">
        <Outlet />
        <Toaster />
      </Card>
    </Card>
  );
}

export default Home;
