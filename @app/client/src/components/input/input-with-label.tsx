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
        'form-control flex h-auto w-full flex-col place-items-stretch',
        className
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
          borderCn
        )}
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default InputWithLabel;
