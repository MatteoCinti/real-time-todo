import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { LOGIN_FORM } from '~/lib/constants';
import { useLogin } from '~/lib/react-query';
import { Button, CardContent, LoadingSpinner } from '~/components/ui';

import { loginFormDefaultValues, loginFormFields } from './config';
import Field from './components/form-field';

function LoginForm() {
  const { mutate, isPending, isError } = useLogin();

  const form = useForm({
    defaultValues: loginFormDefaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      mutate(value);
    }
  });

  return (
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
          {isError && (
            <div className="text-destructive">Invalid credentials</div>
          )}
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
  );
}

export default LoginForm;
