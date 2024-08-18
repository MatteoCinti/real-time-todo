import { useEffect, useState } from 'react';

import TodoForm from '~/components/form/todo-form';
import { cn } from '~/lib/utils/ui';

import './app.css';

const themeClassNames = 'bg-background text-primary';

function App() {
  const [_, setBackendTime] = useState('UNKOWN');

  useEffect(() => {
    fetch('/api/checkConnections')
      .then((res) => res.json())
      .then((data) => {
        setBackendTime(data.serverTime);
      });
  }, []);

  return (
    <div className={cn('h-full w-full', themeClassNames)}>
      <TodoForm />
    </div>
  );
}

export default App;
