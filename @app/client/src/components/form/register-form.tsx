import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { useRegister } from '~/lib/react-query';
import { LOGIN_FORM } from '~/lib/constants';
import { cn } from '~/lib/utils/ui';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  LoadingSpinner
} from '~/components/ui';

import { registerFormDefaultValues, registerFormFields } from './config';
import Field from './components/form-field';

type Props = {
  className?: string;
};

function RegisterForm({ className }: Props) {
  const { mutate, isPending } = useRegister();

  const form = useForm({
    defaultValues: registerFormDefaultValues,
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
            {registerFormFields.map((field) => (
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
                {isSubmitting || isPending ? <LoadingSpinner /> : 'Register'}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
