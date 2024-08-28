import { useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import { TodosList } from '~/components';
import { useToast } from '~/components/ui/use-toast';
import {
  useSubscribeToTodoUpdates,
  useSuscribeTodoCreate,
  useSubscribeTodoDelete
} from '~/lib/react-query';

function TodosPage() {
  const { board: boardId } = useParams({ strict: false });
  const { creationError } = useSuscribeTodoCreate({ board: Number(boardId) });
  const { updateError } = useSubscribeToTodoUpdates({ board: Number(boardId) });
  const { deleteError } = useSubscribeTodoDelete({ board: Number(boardId) });
  const { toast } = useToast();

  useEffect(() => {
    if (deleteError || updateError || creationError) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description:
          'Reconnecting to Websockets, please wait or try refreshing the page.',
        variant: 'destructive'
      });
    }

    return () => {};
  }, [deleteError, creationError, updateError, toast]);

  return <TodosList />;
}

export default TodosPage;
