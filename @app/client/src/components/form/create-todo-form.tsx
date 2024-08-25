/* eslint-disable */
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { Button, LoadingSpinner } from '~/components/ui';
import Field from './form-field';
import { todoFormDefaultValues, todoFormFields } from './config';
import { Plus } from 'lucide-react';
import { cn } from '~/lib/utils/ui';
import { useCreateTodo } from '~/lib/react-query';
import { useParams } from '@tanstack/react-router';
import { CREATE_TODO_FORM } from '~/lib/constants';
import { useEffect } from 'react';

function CreateTodo() {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  const { mutate, isPending, isSuccess } = useCreateTodo(boardId);

  const form = useForm({
    defaultValues: todoFormDefaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      mutate({
        title: value.title,
        board: Number(boardId),
        description: value.description
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
        className="flex-1 p-0 pr-3"
        key={todoFormFields[0].id}
        input={todoFormFields[0]}
        form={form}
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
