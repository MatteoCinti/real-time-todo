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

function LoginForm({ className }: Props) {
  //   const { mutate, isPending } = useLogin();

  const form = useForm({
    defaultValues: boardFormDefaultValues,
    validatorAdapter: zodValidator()
    // onSubmit: async ({ value }) => mutate(value)
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
      <li className="hover:border-primary relative m-0 p-0 focus-within:border-b hover:border-b focus:border-b">
        {boardFormFields.map((field) => (
          <Field
            className="m-0"
            key={field.id}
            input={field}
            form={form}
            border={false}
          />
        ))}
        <CirclePlus
          className="hover:text-accent-foreground absolute right-0 top-4 cursor-pointer text-slate-600"
          size="20"
        />
      </li>

      {/* <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          > */}
      {/* {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="mx-auto"
                disabled={!canSubmit || isSubmitting || isPending}
              >
                {isSubmitting || isPending ? <LoadingSpinner /> : 'Login'}
              </Button>
            )} */}
      {/* </form.Subscribe> */}
    </form>
  );
}

export default LoginForm;
