import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

import useLogin from '~/lib/react-query/mutations/user-login';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  LoadingSpinner
} from '~/components/ui';

import { loginFormDefaultValues, loginFormFields } from './config';
import Field from './form-field';

function LoginForm() {
  const { mutate, data, isPending } = useLogin();

  const form = useForm({
    defaultValues: loginFormDefaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      mutate(value);
    }
  });

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ LoginForm ~ data:', data);
  }, [data]);

  return (
    <Card>
      <CardHeader>Login / Register</CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          data-testid="login-form"
          className="space-y-8"
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
