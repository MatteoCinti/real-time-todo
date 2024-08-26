import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/')({
  beforeLoad: () => {
    return redirect({
      to: '/board'
    });
  },
  component: () => <div>Hello /_auth/!</div>
});
