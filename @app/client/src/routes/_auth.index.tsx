import { createFileRoute } from '@tanstack/react-router';
import { TodoForm } from '~/components';

export const Route = createFileRoute('/_auth/')({
  component: () => (
    <div>
      <TodoForm />
    </div>
  )
});
