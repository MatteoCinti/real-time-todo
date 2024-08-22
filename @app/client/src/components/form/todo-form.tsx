import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { useUser } from '~/lib/react-query';
import { Button, Card, CardContent, CardHeader } from '~/components/ui';
import Field from './form-field';
import { todoFormDefaultValues, todoFormFields } from './config';

function TodoForm() {
  const { data } = useUser({ id: 1 });
  console.log('🚀 ~ TodoForm ~ data:', data);

  const form = useForm({
    defaultValues: todoFormDefaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      // Do something with form data
      // eslint-disable-next-line no-console
      console.log('submitted: ', value);
    }
  });

  return (
    <Card>
      <CardHeader>Create your to-do</CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          data-testid="todo-form"
          className="space-y-8"
        >
          <div>
            {todoFormFields.map((field) => (
              <Field key={field.id} input={field} form={form} />
            ))}
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Create'}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}

export default TodoForm;
