import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';

import useLogin from '~/lib/react-query/mutations/user-login';
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
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: loginFormDefaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      mutate(value);
      navigate({ to: '/_auth/' });
    }
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
