import { cn } from '~/lib/utils/ui';
import { Input, Label } from '~/components/ui';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  border?: boolean;
  label?: boolean;
};

function InputWithLabel({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  name,
  type,
  title,
  className,
  value,
  placeholder,
  onChange,
  onClick,
  readOnly,
  onBlur,
  label = true,
  border = true
}: Props) {
  const borderCn = border
    ? 'border border-muted'
    : 'border-0 focus-visible:ring-0 rounded-none pl-0';

  return (
    <div
      className={cn(
        'form-control flex h-auto w-full flex-col place-items-stretch'
      )}
    >
      {title && (
        <Label
          className={cn('text-md mb-2', !label && 'hidden')}
          htmlFor={name}
        >
          {title}
        </Label>
      )}
      <Input
        className={cn(
          'text-primary border placeholder:text-gray-700 focus-within:placeholder:text-stone-500',
          borderCn,
          className
        )}
        id={name}
        name={name}
        type={type}
        value={value}
        onBlur={onBlur}
        onClick={onClick}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputWithLabel;
