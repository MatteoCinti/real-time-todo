import { createFileRoute } from '@tanstack/react-router';
import { Login } from '~/pages';

export const Route = createFileRoute('/register')({
  component: () => <Login />
});
