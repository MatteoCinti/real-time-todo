import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { CirclePlus } from 'lucide-react';

import { useCreateBoard } from '~/lib/react-query/mutations';
import { Button, LoadingSpinner } from '~/components/ui';
import { cn } from '~/lib/utils/ui';

import { boardFormDefaultValues, boardFormFields } from './config';
import Field from './form-field';

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
      data-testid="login-form"
      className="flex flex-col space-y-8"
    >
      <li className="border-muted hover:border-primary focus-within:border-primary relative m-0 border-b p-0">
        {boardFormFields.map((field) => (
          <Field
            className="m-0"
            key={field.id}
            input={field}
            form={form}
            border={false}
            displayError={false}
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
                'hover:text-accent-foreground absolute right-0 top-5 h-min w-min cursor-pointer p-0 text-slate-600',
                canSubmit && 'text-primary'
              )}
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting || isPending ? (
                <LoadingSpinner className="bg-none" />
              ) : (
                <CirclePlus size="18" />
              )}
            </Button>
          )}
        </form.Subscribe>
      </li>
    </form>
  );
}

export default BoardForm;
