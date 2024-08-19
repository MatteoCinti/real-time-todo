/* eslint-disable */

import { useGqlQuery } from '~/lib/react-query';
import { SubscribeToDos } from '~/lib/react-query/subscriptions';
import { cn } from '~/lib/utils/ui';
import { GetTodosDocument } from '~/lib/graphql';

import TodoForm from '~/components/form/todo-form';
import './app.css';

const themeClassNames = 'bg-background text-primary';

function App() {
  const { data: todos } = useGqlQuery({
    queryKey: ['todos'],
    queryDocument: GetTodosDocument
  });
  SubscribeToDos({ boardId: '1' });

  return (
    <div className={cn('h-full w-full', themeClassNames)}>
      <div>
        {todos?.getTodos!.map((todo) => <p key={todo?.title}>{todo!.title}</p>)}
        <TodoForm />
      </div>
    </div>
  );
}

export default App;
