import { Maximize2 } from 'lucide-react';

import { EditTodoDescriptionForm } from '~/components/form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '~/components/ui';
import { Todo } from '~/lib/graphql/__generated__/graphql';

type Props = {
  todo: Todo;
};

function TodoDetailSheet({ todo }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <Maximize2
          className="text-muted-foreground hover:text-primary"
          size={14}
        />
      </SheetTrigger>

      <SheetContent className="!min-w-2/4 flex h-full w-4/5 flex-col sm:max-w-full">
        <SheetHeader>
          <SheetTitle className="whitespace-nowrap">
            <span className="text-accent font-bold">{todo.title} </span>
            <span>details</span>
          </SheetTitle>
        </SheetHeader>
        <SheetDescription>Add more details about your todo</SheetDescription>

        <EditTodoDescriptionForm className="h-full" todoId={todo.id} />
      </SheetContent>
    </Sheet>
  );
}

export default TodoDetailSheet;
