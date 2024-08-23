import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1)
});

type BoardFormFields = z.infer<typeof formSchema>;

export const boardFormFields: FormField<BoardFormFields>[] = [
  {
    id: 'title',
    type: 'text',
    placeholder: 'board name',
    validators: {
      onChange: formSchema.shape.title
    }
  }
];

export const boardFormDefaultValues: BoardFormFields = {
  title: ''
};
