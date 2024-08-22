import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { PageContainer } from '~/components';
import { AuthContext } from '~/hooks';

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <PageContainer>
      <Outlet />
      <TanStackRouterDevtools />
    </PageContainer>
  )
});
