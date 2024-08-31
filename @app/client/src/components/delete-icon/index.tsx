import { X } from 'lucide-react';
import { cn } from '~/lib/utils/ui';
import { LoadingSpinner } from '../ui';

type Props = {
  isDeleting: boolean;
  deleteMutation: () => void;
  className?: string;
};

function DeleteIcon({ isDeleting, deleteMutation, className }: Props) {
  return isDeleting ? (
    <LoadingSpinner className="my-auto ml-2 h-4 w-4" />
  ) : (
    <X
      className={cn(
        'text-muted-foreground hover:text-primary my-auto ml-2 h-full cursor-pointer',
        className
      )}
      size={14}
      onClick={deleteMutation}
    />
  );
}

export default DeleteIcon;
