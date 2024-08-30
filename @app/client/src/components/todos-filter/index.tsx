import { Eye, EyeOff } from 'lucide-react';
import { useActiveFilters } from '~/hooks';
import { cn } from '~/lib/utils';
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui';

type Props = {
  className?: string;
};

function TodosFilter({ className }: Props) {
  const { showCompleted, setShowCompleted } = useActiveFilters();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'focus:bg-muted focus-within:bg-muted hover:bg-muted h-min px-3 py-1',
            className
          )}
        >
          <Eye size={16} className="text-primary h-min" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-xs">Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showCompleted}
          onCheckedChange={setShowCompleted}
          className={cn(
            'hove:bg-muted focus:bg-muted cursor-pointer bg-transparent p-2 text-xs [&>span]:hidden',
            !showCompleted && 'text-muted-foreground line-through'
          )}
        >
          {showCompleted ? (
            <Eye size={18} className="mr-3" />
          ) : (
            <EyeOff size={18} className="mr-3" />
          )}{' '}
          Completed items
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TodosFilter;
