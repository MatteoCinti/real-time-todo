import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1)
});

type BoardFormFields = z.infer<typeof formSchema>;

export const boardTitleField = {
  id: 'title',
  type: 'text',
  placeholder: 'board name',
  label: 'Board Name',
  validators: {
    onChange: formSchema.shape.title
  }
};

export const boardFormFields: FormField<BoardFormFields>[] = [boardTitleField];

export const boardFormDefaultValues: BoardFormFields = {
  title: ''
};
