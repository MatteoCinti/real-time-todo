import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { LOGIN_FORM } from '~/lib/constants';
import { useLogin } from '~/lib/react-query';
import { cn } from '~/lib/utils/ui';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  LoadingSpinner
} from '~/components/ui';

import { loginFormDefaultValues, loginFormFields } from './config';
import Field from './form-field';

type Props = {
  className?: string;
};

function LoginForm({ className }: Props) {
  const { mutate, isPending } = useLogin();

  const form = useForm({
    defaultValues: loginFormDefaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => mutate(value)
  });

  return (
    <Card className={cn('', className)}>
      <CardHeader>Login / Register</CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          data-testid={LOGIN_FORM}
          className="flex flex-col space-y-8"
        >
          <div>
            {loginFormFields.map((field) => (
              <Field key={field.id} input={field} form={form} />
            ))}
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="mx-auto"
                disabled={!canSubmit || isSubmitting || isPending}
              >
                {isSubmitting || isPending ? <LoadingSpinner /> : 'Login'}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
