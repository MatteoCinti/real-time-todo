import { useField } from '@tanstack/react-form';
import { cn } from '~/lib/utils/ui';

import { InputWithLabel } from '../input';
import { Input } from '../ui';

function Field<T>({
  input,
  form,
  className,
  border = true,
  displayError = true
}: {
  input: FormField<T>;
  form: any;
  className?: string;
  border?: boolean;
  displayError?: boolean;
}) {
  const field = useField<T, FormField<T>['id']>({
    name: input.id,
    form,
    validators: input.validators
  });

  const borderCn = border
    ? 'border border-muted'
    : 'border-0 focus-visible:ring-0 rounded-none pl-0';

  return (
    <>
      {input.label ? (
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
      ) : (
        <Input
          className={cn(
            'text-primary border placeholder:text-slate-700 focus-within:placeholder:text-slate-500',
            borderCn
          )}
          id={input.type}
          name={field.name.toString()}
          type={input.type}
          value={field.state.value as string | number | string[] | undefined}
          placeholder={input.placeholder}
          onChange={(e) => field.handleChange(e.target.value as any)}
          onBlur={field.handleBlur}
        />
      )}
      {field.state.meta.errors.length && displayError ? (
        <span className="text-destructive text-sm font-bold">
          {field.state.meta.errors.join(',')}
        </span>
      ) : null}
    </>
  );
}

export default Field;
