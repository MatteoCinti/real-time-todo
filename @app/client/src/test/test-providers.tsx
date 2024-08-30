import {
  RouterProvider,
  createRootRoute,
  createRouter
} from '@tanstack/react-router';
import { FiltersProvider, QueryProvider } from '~/lib/providers';

function TestProviders({ children }: { children: React.JSX.Element }) {
  const rootRouter = createRootRoute({
    component: () => children
  });

  const routeTree: any = rootRouter;

  const router = createRouter({ routeTree });
  return (
    <QueryProvider>
      <FiltersProvider>
        <RouterProvider router={router} />
      </FiltersProvider>
    </QueryProvider>
  );
}

export default TestProviders;
