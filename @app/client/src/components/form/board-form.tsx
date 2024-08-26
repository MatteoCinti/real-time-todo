import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { CirclePlus } from 'lucide-react';

import { CREATE_BOARD_FORM } from '~/lib/constants';
import { useCreateBoard } from '~/lib/react-query';
import { Button, LoadingSpinner } from '~/ui';
import { cn } from '~/lib/utils/ui';

import { boardFormDefaultValues, boardFormFields } from './config';
import Field from './components/form-field';

function BoardForm() {
  const { mutate, isPending, isSuccess } = useCreateBoard();

  const form = useForm({
    defaultValues: boardFormDefaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      mutate(value);
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
      data-testid={CREATE_BOARD_FORM}
      className="m-0 flex w-full flex-row p-0"
    >
      {boardFormFields.map((field) => (
        <Field
          className="m-0"
          key={field.id}
          input={field}
          form={form}
          border={false}
          displayError={false}
          label={false}
        />
      ))}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            variant="ghost"
            type="submit"
            className={cn(
              'hover:text-primary bg-primary-foreground focus-visible:bg-muted z-10 my-auto h-min w-min cursor-pointer items-center p-0 text-slate-600 hover:bg-transparent',
              canSubmit && 'text-primary'
            )}
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting || isPending ? (
              <LoadingSpinner className="bg-primary-foreground h-5 w-5" />
            ) : (
              <CirclePlus size="18" />
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}

export default BoardForm;
