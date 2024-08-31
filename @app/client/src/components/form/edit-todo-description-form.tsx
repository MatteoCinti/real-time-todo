import { zodValidator } from '@tanstack/zod-form-adapter';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';

import { cn } from '~/lib/utils/ui';
import {
  updateGetTodosCache,
  useGetTodos,
  useUpdateTodo
} from '~/lib/react-query';
import { CREATE_TODO_FORM } from '~/lib/constants';
import { Button, LoadingSpinner } from '~/components/ui';

import { todoDescriptionField } from './config/todo-form.config';
import RichTextEditor from './components/rich-text-editor';

type Props = {
  todoId: number;
  className?: string;
};

function EditTodo({ todoId, className }: Props) {
  const { board: boardId } = useParams({ strict: false });
  const { data } = useGetTodos({ board: Number(boardId) });
  const todo = data!.todos!.find((t) => t!.id === todoId);

  const queryClient = useQueryClient();
  const { mutate } = useUpdateTodo();

  const form = useForm({
    defaultValues: todo,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      if (value?.description === null || !value?.title) return;
      updateGetTodosCache(queryClient, [{ ...value }], {
        board: Number(boardId)
      });
      mutate({
        board: Number(boardId),
        todo: {
          ...value
        }
      });
    }
  });

  if (!todo) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      data-testid={CREATE_TODO_FORM}
      className={cn('m-0 flex h-full w-full flex-col p-0', className)}
    >
      <RichTextEditor
        className="h-5/6 overflow-auto"
        form={form}
        input={todoDescriptionField}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            variant="default"
            type="submit"
            className={cn(
              'text-primary bg-muted hover:text-primary-foreground z-10 mb-0 ml-auto mt-auto h-min w-2/4 cursor-pointer items-center px-4 py-2 md:w-24',
              canSubmit && 'text-primary hover:text-primary-foreground'
            )}
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? (
              <LoadingSpinner className="bg-primary-foreground h-5 w-5" />
            ) : (
              `Submit`
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}

export default EditTodo;
