import { useEffect } from 'react';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useParams } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { Plus } from 'lucide-react';

import { useCreateTodo, useGetTodos } from '~/lib/react-query';
import { Button, LoadingSpinner } from '~/components/ui';
import { CREATE_TODO_FORM } from '~/lib/constants';
import { generateIndex, cn } from '~/lib/utils';

import { todoTitleField, todoFormDefaultValues } from './config';
import Field from './components/form-field';

function CreateTodo() {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  const { data: todosData } = useGetTodos({ board: Number(boardId) });
  const { mutate, isPending, isSuccess } = useCreateTodo(boardId);

  const form = useForm({
    defaultValues: todoFormDefaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const todosLength = todosData?.todos?.length ?? 0;
      const order = generateIndex(todosLength);

      mutate({
        title: value.title,
        board: Number(boardId),
        description: value.description,
        order
      });
    }
  });

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      data-testid={CREATE_TODO_FORM}
      className="m-0 flex w-full flex-row p-0"
    >
      <Field
        form={form}
        className="flex-1 p-0 pr-3"
        key={todoTitleField.id}
        input={todoTitleField}
        label={false}
        border={false}
        displayError={false}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            variant="ghost"
            type="submit"
            className={cn(
              'hover:text-primary focus-visible:bg-muted z-10 my-auto h-min w-min cursor-pointer items-center p-0 text-slate-600 hover:bg-transparent',
              canSubmit && 'text-primary'
            )}
            disabled={!canSubmit || isSubmitting || isPending}
          >
            {isSubmitting || isPending ? (
              <LoadingSpinner className="bg-primary-foreground h-5 w-5" />
            ) : (
              <Plus size="18" />
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}

export default CreateTodo;
