import { useState } from 'react';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { Pencil } from 'lucide-react';

import { cn } from '~/lib/utils/ui';
import {
  updateGetTodosCache,
  useGetTodos,
  useUpdateTodo
} from '~/lib/react-query';
import { CREATE_TODO_FORM } from '~/lib/constants';
import {
  Button,
  LoadingSpinner,
  Tooltip,
  TooltipContent,
  TooltipProvider
} from '~/components/ui';

import { todoIsDoneField, todoTitleField } from './config';
import Field from './components/form-field';

type Props = {
  todoId: number;
};

function EditTodo({ todoId }: Props) {
  const { board: boardId } = useParams({ strict: false });
  const { data } = useGetTodos({ board: Number(boardId) });
  const todo = data!.todos!.find((t) => t!.id === todoId);
  const queryClient = useQueryClient();
  const { mutate } = useUpdateTodo();

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const inputDisabled = !inputFocused || todo?.isDone;

  const form = useForm({
    defaultValues: todo,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      if (value?.isDone === null || !value?.title) return;
      updateGetTodosCache(queryClient, [{ ...value }], {
        board: Number(boardId)
      });
      setInputFocused(false);
      mutate({
        board: Number(boardId),
        todo: {
          ...value
        }
      });
    }
  });

  if (!todo) return null;

  function handleTextAreaClick(
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    if (e.detail === 2) {
      setInputFocused(true);
    }
    if (inputDisabled) {
      setTooltipOpen(true);
    }
  }

  function handleBlur() {
    setInputFocused(false);
  }

  function handleCheckboxClick() {
    const isDone = !todo?.isDone;
    updateGetTodosCache(queryClient, [{ ...form.state.values!, isDone }], {
      board: Number(boardId)
    });
    mutate({
      board: Number(boardId),
      todo: {
        id: todo!.id,
        isDone
      }
    });
  }

  return (
    <TooltipProvider>
      <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
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
            className={cn(
              'my-auto mr-2 p-0',
              todo?.isDone && '!bg-success border-success'
            )}
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
              !inputFocused && 'border-transparent',
              inputFocused && 'focus-visible:border-muted',
              todo?.isDone && 'italic text-slate-400 line-through'
            )}
            onBlur={() => handleBlur()}
            key={todoTitleField.id}
            input={todoTitleField}
            placeholder="Edit todo"
            readOnly={inputDisabled}
            form={form}
            label={false}
            border={false}
            displayError={false}
          />

          <TooltipContent className="translate-x-4 translate-y-10">
            <p>Completed todos cannot be edited.</p>
          </TooltipContent>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) =>
              !inputDisabled && (
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
      </Tooltip>
    </TooltipProvider>
  );
}

export default EditTodo;
