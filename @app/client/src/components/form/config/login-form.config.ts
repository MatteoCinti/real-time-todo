import { z } from 'zod';

const usernameMinLength = 3;
const passwordMinLength = 3;

export const errorMessages = {
  username: `Username should be at least ${usernameMinLength} characters long`,
  password: `Password should be at least ${passwordMinLength} characters long`
};
const formSchema = z.object({
  username: z.string().min(usernameMinLength, errorMessages.username),
  password: z.string().min(passwordMinLength, errorMessages.password)
});

const firstNameSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First name should be at least 3 characters long')
});

type LoginFormFields = z.infer<typeof formSchema>;
type RegisterFormFields = z.infer<typeof formSchema & typeof firstNameSchema>;

export const loginFormFields: FormField<LoginFormFields>[] = [
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'username',
    validators: {
      onChange: formSchema.shape.username
    }
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '********',
    validators: {
      onChange: formSchema.shape.password
    }
  }
];

export const registerFormFields: FormField<RegisterFormFields>[] = [
  ...loginFormFields,
  {
    id: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'first name',
    validators: {
      onChange: firstNameSchema.shape.firstName
    }
  }
];

export const loginFormDefaultValues: LoginFormFields = {
  username: '',
  password: ''
};

export const registerFormDefaultValues: RegisterFormFields = {
  ...loginFormDefaultValues,
  firstName: ''
};
