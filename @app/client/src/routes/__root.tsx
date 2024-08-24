import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient } from '@tanstack/react-query';

import { PageContainer } from '~/components';
import { AuthContext } from '~/hooks';

type RouterContext = {
  authentication: AuthContext;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <PageContainer>
      <Outlet />
      <TanStackRouterDevtools />
    </PageContainer>
  )
});
