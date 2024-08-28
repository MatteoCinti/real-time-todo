/* eslint-disable  check-file/filename-naming-convention */
import { createFileRoute } from '@tanstack/react-router';
import TodosPage from '~/pages/todos';

export const Route = createFileRoute('/_auth/board/$board/$guest')({
  component: () => <TodosPage />
});
