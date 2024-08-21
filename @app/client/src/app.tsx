import { SubscribeToDos } from '~/lib/react-query/subscriptions';
import { cn } from '~/lib/utils/ui';

import TodoForm from '~/components/form/todo-form';
import './app.css';
import LoginForm from './components/form/login-form';

const themeClassNames = 'bg-background text-primary';

function App() {
  //   const { data: todos } = useGqlQuery({
  //     queryKey: ['todos'],
  //     queryDocument: GetTodosDocument
  //   });
  SubscribeToDos({ boardId: '1' });

  return (
    <div className={cn('h-full w-full', themeClassNames)}>
      <div>
        <LoginForm />

        <TodoForm />
      </div>
    </div>
  );
}

export default App;
