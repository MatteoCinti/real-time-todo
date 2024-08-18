import { cn } from '~/lib/utils/ui';
import { Input, Label } from '~/components/ui';

function InputWithLabel({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  name,
  type,
  title,
  className,
  value,
  placeholder,
  onChange,
  onBlur
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn('form-control w-full place-items-stretch', className)}>
      <Label className="text-md" htmlFor={name}>
        {title}
      </Label>
      <Input
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
