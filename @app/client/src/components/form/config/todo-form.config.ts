import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(3, 'Name is required'),
  description: z.string().min(5)
});

type TodoFormFields = z.infer<typeof formSchema>;

export const errorMessages = {
  title: 'Title should be at least 3 characters long',
  description: 'Description should be at least 5 characters long'
};

export const todoFormFields: FormField<TodoFormFields>[] = [
  {
    id: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'Enter title',
    validators: {
      onChange: z.string().min(3, errorMessages.title)
    }
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'Enter description',
    validators: {
      onChange: z.string().min(5, errorMessages.description)
    }
  }
];

export const todoFormDefaultValues: TodoFormFields = {
  title: '',
  description: ''
};
