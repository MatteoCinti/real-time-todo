import { useContext } from 'react';

import { cn } from '~/lib/utils/ui';
import { DragContext } from './drag';
import ErrorComponent from '../error';

type Props = {
  as?: any;
  dropId: string;
  children?: React.ReactNode;
  className?: string;
  //   dropType?: string;
};

function DropGuide({ as, dropId, children, className }: Props) {
  const dragContext = useContext(DragContext!);
  if (!dragContext) {
    return <ErrorComponent />;
  }
  const { drop } = dragContext;

  const Component = as || 'div';

  return drop === dropId ? (
    <Component
      className={cn(
        'border-primary h-12 w-full rounded-lg border border-dashed',
        className
      )}
    >
      {children}
    </Component>
  ) : null;
}

export default DropGuide;
