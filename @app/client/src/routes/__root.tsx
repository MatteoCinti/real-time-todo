import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

import { PageContainer } from '~/components';
import { AuthContext } from '~/hooks';
import { Toaster } from '~/components/ui';

type RouterContext = {
  authentication: AuthContext;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <PageContainer>
      <main className="flex h-full w-full flex-col">
        <Outlet />
      </main>
      <Toaster />
    </PageContainer>
  )
});
