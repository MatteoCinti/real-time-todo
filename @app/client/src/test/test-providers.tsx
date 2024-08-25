import {
  RouterProvider,
  createRootRoute,
  createRouter
} from '@tanstack/react-router';
import { QueryProvider } from '~/lib/providers';

function TestProviders({ children }: { children: React.JSX.Element }) {
  const rootRouter = createRootRoute({
    component: () => children
  });

  const routeTree: any = rootRouter;

  const router = createRouter({ routeTree });
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default TestProviders;
