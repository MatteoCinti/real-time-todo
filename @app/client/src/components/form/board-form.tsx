/* eslint-disable */
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { useLogin } from '~/lib/react-query';
import { cn } from '~/lib/utils/ui';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  LoadingSpinner
} from '~/components/ui';

import { boardFormDefaultValues, boardFormFields } from './config';
import Field from './form-field';
import { CirclePlus, MessageSquareDiff } from 'lucide-react';

type Props = {
  className?: string;
};

function BoardForm({ className }: Props) {
  //   const { mutate, isPending } = useLogin();

  const form = useForm({
    defaultValues: boardFormDefaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      console.log(value);
    }
  });

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
              <CirclePlus size="18" />
            </Button>
          )}
        </form.Subscribe>
      </li>
    </form>
  );
}

export default BoardForm;
