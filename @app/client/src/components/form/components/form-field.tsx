import { useField } from '@tanstack/react-form';
import { Checkbox } from '~/components/ui';
import { cn } from '~/lib/utils/ui';
import { InputWithLabel } from '../../input';

function Field<T>({
  input,
  form,
  onBlur,
  onTextAreaClick,
  onCheckboxClick,
  className,
  placeholder,
  label = true,
  border = true,
  readOnly = false,
  displayError = true
}: {
  form: any;
  input: FormField<T>;
  label?: boolean;
  border?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onCheckboxClick?: () => void;
  onTextAreaClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  displayError?: boolean;
}) {
  const field = useField<T, FormField<T>['id']>({
    name: input.id,
    form,
    validators: input.validators
  });

  function renderInput() {
    if (input.type === 'checkbox') {
      return (
        <Checkbox
          checked={field.state.value as boolean}
          value={field.state.value as string | number | string[] | undefined}
          onClick={onCheckboxClick}
          className={cn(className)}
        />
      );
    }
    return (
      <InputWithLabel
        name={field.name.toString()}
        type={input.type}
        title={input.label}
        label={label}
        readOnly={readOnly}
        value={field.state.value as string | number | string[] | undefined}
        placeholder={placeholder ?? input.placeholder}
        className={className}
        border={border}
        onBlur={onBlur}
        onClick={onTextAreaClick}
        onChange={(e) => field.handleChange(e.target.value as any)}
      />
    );
  }

  return (
    <>
      {renderInput()}
      {field.state.meta.errors.length && displayError ? (
        <span className="text-destructive text-sm font-bold">
          {field.state.meta.errors.join(',')}
        </span>
      ) : null}
    </>
  );
}

export default Field;
