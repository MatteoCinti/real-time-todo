import { RouterProvider, createRouter } from '@tanstack/react-router';
import { useAuth } from '~/hooks';

// Import the generated route tree
import { routeTree } from '../../../routeTree.gen';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { authentication: undefined! }
});

function Provider() {
  const authentication = useAuth();
  return <RouterProvider router={router} context={{ authentication }} />;
}

export default Provider;
