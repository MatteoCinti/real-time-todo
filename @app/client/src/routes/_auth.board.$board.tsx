/* eslint-disable  check-file/filename-naming-convention */
import { createFileRoute } from '@tanstack/react-router';
import { TodosList } from '~/components';

export const Route = createFileRoute('/_auth/board/$board')({
  component: () => <TodosList />
});
