import { useEffect, useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { useActiveFilters } from '~/hooks';
import { cn } from '~/lib/utils';
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input
} from '../ui';

type Props = {
  className?: string;
};

function TodosFilter({ className }: Props) {
  const { showCompleted, setShowCompleted, textSearch, setTextSearch } =
    useActiveFilters();
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    if (!showCompleted || (textSearch && textSearch.length > 0)) {
      setIsFilterApplied(true);
    } else {
      setIsFilterApplied(false);
    }
  }, [showCompleted, textSearch]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'focus:bg-muted hover:bg-muted h-min px-3 py-1',
            className,
            isFilterApplied && 'bg-accent focus:bg-accent'
          )}
        >
          {isFilterApplied ? (
            <EyeOff size={16} className={cn('text-primary h-min')} />
          ) : (
            <Eye size={16} className={cn('text-primary h-min')} />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 -translate-x-8">
        <DropdownMenuLabel className="text-xs">Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className="relative">
          <Input
            className="relative"
            type="text"
            placeholder="Search"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
          />
          <X
            className="text-muted hover:text-primary absolute right-2 top-2.5 cursor-pointer"
            size={16}
            onClick={() => setTextSearch('')}
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TodosFilter;
