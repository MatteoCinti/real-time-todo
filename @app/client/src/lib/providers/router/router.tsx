import { RouterProvider, createRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '~/hooks';

// Import the generated route tree
import { routeTree } from '../../../routeTree.gen';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { authentication: undefined!, queryClient: undefined! },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0
});

function Provider() {
  const authentication = useAuth();
  const queryClient = useQueryClient();

  return (
    <RouterProvider router={router} context={{ authentication, queryClient }} />
  );
}

export default Provider;
