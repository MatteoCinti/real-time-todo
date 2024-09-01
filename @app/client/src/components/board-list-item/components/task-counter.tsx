import { Board } from '~/lib/graphql/__generated__/graphql';
import { useGetTodos } from '~/lib/react-query';
import { Badge } from '~/components/ui';
import { cn } from '~/lib/utils';

type Props = {
  board: Omit<Board, 'owner'>;
  className?: string;
};

function TaskCounter({ board, className }: Props) {
  const { data: todosData } = useGetTodos({ board: Number(board.id!) });
  const primaryTasks = todosData!.todos!.filter((t) => t!.parentId === null);

  const [completed, total] = primaryTasks.reduce(
    (acc, todo) => {
      if (todo?.isDone) {
        acc[0]++;
      }
      acc[1]++;
      return acc;
    },
    [0, 0]
  );

  const noTasks = total === 0;
  const allTasksCompleted = completed === total && total > 0;

  return (
    <div
      className={cn(
        'flex flex-row items-center gap-3 text-xs text-gray-300',
        className
      )}
    >
      {noTasks && (
        <Badge
          className="text-muted-foreground border-muted-foreground py-0.5"
          variant="outline"
        >
          Empty
        </Badge>
      )}
      {allTasksCompleted && (
        <Badge
          className="bg-green-600 py-0.5 hover:bg-green-700"
          variant="default"
        >
          done
        </Badge>
      )}

      {!noTasks && !allTasksCompleted && (
        <Badge
          className="text-muted-foreground border-muted-foreground py-0.5"
          variant="outline"
        >
          {completed} / {total}{' '}
        </Badge>
      )}
    </div>
  );
}

export default TaskCounter;
