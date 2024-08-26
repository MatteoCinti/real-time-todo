import { useState } from 'react';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useParams } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { Pencil } from 'lucide-react';

import { cn } from '~/lib/utils/ui';
import { useGetTodos, useUpdateTodo } from '~/lib/react-query';
import { CREATE_TODO_FORM } from '~/lib/constants';
import { Button, LoadingSpinner } from '~/components/ui';

import { todoIsDoneField, todoTitleField } from './config';
import Field from './components/form-field';

type Props = {
  todoId: number;
};

function EditTodo({ todoId }: Props) {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  const { data } = useGetTodos({ board: Number(boardId) });
  const todo = data!.todos!.find((t) => t!.id === todoId);

  const { mutate } = useUpdateTodo(todo!.id);
  const [isDisabled, setIsDisabled] = useState(true);

  const form = useForm({
    defaultValues: todo,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ value:', value);
    }
  });

  //   useEffect(() => {
  //     if (isSuccess) {
  //       form.reset();
  //     }
  //   }, [isSuccess, form]);

  if (!todo) return null;

  function handleTextAreaClick(
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    if (e.detail === 2) {
      setIsDisabled(false);
    }
  }

  function handleBlur() {
    setIsDisabled(true);
  }

  function handleCheckboxClick() {
    mutate({
      id: todo!.id,
      isDone: !todo?.isDone
    });
  }

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
        className="my-auto mr-2 p-0"
        onCheckboxClick={() => handleCheckboxClick()}
        key={todoIsDoneField.id}
        input={todoIsDoneField}
        form={form}
        label={false}
        border={false}
        displayError={false}
      />
      <Field
        onTextAreaClick={(e) => handleTextAreaClick(e)}
        className={cn(
          'flex-1 rounded-lg border border-transparent px-2 py-1.5',
          isDisabled && 'border-transparent',
          !isDisabled && 'focus-visible:border-muted',
          todo?.isDone && 'border-accent text-slate-400 line-through'
        )}
        onBlur={() => handleBlur}
        key={todoTitleField.id}
        input={todoTitleField}
        placeholder="Edit todo"
        readOnly={isDisabled}
        form={form}
        label={false}
        border={false}
        displayError={false}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) =>
          !isDisabled && (
            <Button
              variant="ghost"
              type="submit"
              className={cn(
                'hover:text-primary focus-visible:bg-muted z-10 my-auto ml-3 h-min w-min cursor-pointer items-center p-0 text-slate-600 hover:bg-transparent',
                canSubmit && 'text-primary'
              )}
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? (
                <LoadingSpinner className="bg-primary-foreground h-5 w-5" />
              ) : (
                <Pencil size="14" />
              )}
            </Button>
          )
        }
      </form.Subscribe>
    </form>
  );
}

export default EditTodo;
