import { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';

import TodoForm from '~/components/form/todo-form';
import { cn } from '~/lib/utils/ui';
import {
  GetTodosDocument,
  gqlClient,
  ListenTodosDocument
} from '~/lib/graphql';

import './app.css';
import { useGqlQuery } from './lib/tanstackQuery';

const themeClassNames = 'bg-background text-primary';

function App() {
  const [backendTime, setBackendTime] = useState('UNKOWN');
  const { data: todos, isLoading: todosLoading } = useGqlQuery({
    queryKey: ['todos'],
    queryDocument: GetTodosDocument
  });

  const { data, loading } = useSubscription(ListenTodosDocument, {
    client: gqlClient,
    variables: { boardId: '1' }
  });

  useEffect(() => {
    // eslint-disable-next-line
    !loading && console.log('🚀 ~ App ~ data:', data);
    // eslint-disable-next-line
    !todosLoading && console.log('🚀 ~ App ~ todos:', todos);
    fetch('/api/checkConnections')
      .then((res) => res.json())
      .then((jj) => {
        setBackendTime(jj.serverTime);
      });
  }, [data, loading, todos, todosLoading]);

  return (
    <div className={cn('h-full w-full', themeClassNames)}>
      <div>Backend Time : {backendTime}</div>
      <div>
        <TodoForm />
      </div>
    </div>
  );
}

export default App;
