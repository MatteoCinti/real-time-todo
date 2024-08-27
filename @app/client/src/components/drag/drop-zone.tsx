/* eslint-disable */

import { useContext } from 'react';
import { DragContext } from './drag';
import ErrorComponent from '../error';
import { cn } from '~/lib/utils/ui';

type Props = {
  dropId?: string;
  dropType?: string;
  as?: any;
  remember?: 'true' | 'false';
  children?: React.ReactNode;
  className?: string;
};

// listens for drags over drop zones
function DropZone({
  as,
  dropId,
  dropType,
  children,
  remember,
  className
}: Props) {
  // eslint-disable-next-line no-console
  console.log('🚀 ~ DropZone ~ dropType:', dropType);
  const dragContext = useContext(DragContext!);
  if (!dragContext) {
    return <ErrorComponent />;
  }
  const { dragItem, dragType, setDrop, drop, onDrop } = dragContext;

  // eslint-disable-next-line no-console
  console.log('🚀 ~ DropZone ~ dragType:', dragType);

  function handleDragOver(e: DragEvent) {
    e.preventDefault();

    return false;
  }

  const Component = as || 'div';
  return (
    <Component
      onDragEnter={() => {
        return dragItem && setDrop(dropId);
      }}
      onDragOver={handleDragOver}
      onDrop={onDrop}
      remember={remember}
      className={cn('relative', className)}
    >
      {children}
      {drop === dropId && <div className="absolute inset-0"></div>}
    </Component>
  );
}

export default DropZone;
