import { useField } from '@tanstack/react-form';
import { InputWithLabel } from '../input';

function Field<T>({
  input,
  form,
  className,
  border = true
}: {
  input: FormField<T>;
  form: any;
  className?: string;
  border?: boolean;
}) {
  const field = useField<T, FormField<T>['id']>({
    name: input.id,
    form,
    validators: input.validators
  });

  return (
    <>
      <InputWithLabel
        name={field.name.toString()}
        type={input.type}
        title={input.label}
        value={field.state.value as string | number | string[] | undefined}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value as any)}
        placeholder={input.placeholder}
        className={className}
        border={border}
      />
      {field.state.meta.errors.length ? (
        <span className="text-destructive text-sm font-bold">
          {field.state.meta.errors.join(',')}
        </span>
      ) : null}
    </>
  );
}

export default Field;
