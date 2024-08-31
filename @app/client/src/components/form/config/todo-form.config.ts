import { z } from 'zod';

export const errorMessages = {
  title: 'Title should be at least 1 characters long',
  description: 'Description should be at least 5 characters long'
};

const formSchema = z.object({
  title: z.string().min(1, errorMessages.title),
  description: z.string().min(5, errorMessages.description),
  isDone: z.boolean()
});

type TodoFormFields = z.infer<typeof formSchema>;

export const todoTitleField: FormField<TodoFormFields> = {
  id: 'title',
  type: 'text',
  label: 'AddTask',
  placeholder: '+ Add task',
  validators: {
    onChange: formSchema.shape.title
  }
};

export const todoDescriptionField: FormField<TodoFormFields> = {
  id: 'description',
  label: 'Todo Description',
  type: 'textarea',
  placeholder: 'Enter description',
  validators: {
    onChange: formSchema.shape.description
  }
};

export const todoIsDoneField: FormField<TodoFormFields> = {
  id: 'isDone',
  label: 'Completed',
  type: 'checkbox',
  placeholder: 'isDone'
};

export const todoFormFields: FormField<TodoFormFields>[] = [
  todoTitleField,
  todoDescriptionField,
  todoIsDoneField
];

export const todoFormDefaultValues: TodoFormFields = {
  title: '',
  description: '',
  isDone: false
};
