type FormField<T> = {
  id: PrefixObjectAccessor<T, []>;
  type: HTMLInputElement['type'];
  label?: string;
  placeholder: string;
  validators?: FieldValidators<T, PrefixObjectAccessor<T, []>>;
};
