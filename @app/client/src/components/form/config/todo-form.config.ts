import { z } from 'zod';

export const errorMessages = {
  title: 'Title should be at least 3 characters long',
  description: 'Description should be at least 5 characters long'
};

const formSchema = z.object({
  title: z.string().min(3, errorMessages.title),
  description: z.string().min(5, errorMessages.description)
});

type TodoFormFields = z.infer<typeof formSchema>;

export const todoFormFields: FormField<TodoFormFields>[] = [
  {
    id: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'Enter title',
    validators: {
      onChange: formSchema.shape.title
    }
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'Enter description',
    validators: {
      onChange: formSchema.shape.description
    }
  }
];

export const todoFormDefaultValues: TodoFormFields = {
  title: '',
  description: ''
};
