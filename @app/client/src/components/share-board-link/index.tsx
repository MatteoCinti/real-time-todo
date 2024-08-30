import { useParams } from '@tanstack/react-router';
import { ExternalLink } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '../ui';
import { useToast } from '../ui/use-toast';

type Props = {
  className?: string;
};

function ShareBoardLink({ className }: Props) {
  const { board: boardId } = useParams({ strict: false });
  const { toast } = useToast();

  const guestUrl = `${window.location.origin}/board/${boardId}/guest`;

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    navigator.clipboard.writeText(guestUrl);
    toast({
      title: 'Link copied',
      description: 'Share it with your friends and family'
    });
  }

  return (
    <Button
      variant="outline"
      onClick={(e) => {
        handleClick(e);
      }}
      className={cn(
        'hover:bg-muted focus-within:bg-muted relative h-min px-3 py-1',
        className
      )}
    >
      <ExternalLink size={16} className="text-primary h-min" />
    </Button>
  );
}

export default ShareBoardLink;
