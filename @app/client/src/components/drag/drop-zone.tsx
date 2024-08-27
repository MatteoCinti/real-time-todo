/* eslint-disable */
import { useContext } from 'react';
import { DragContext, DragContextProps } from './drag';
import { cn } from '~/lib/utils';

interface Props {
  as?: any;
  dropId?: string;
  dropType?: string;
  remember?: 'true' | 'false';
  children?: React.ReactNode;
  className?: string;
}

// listens for drags over drop zones
function DropZone({ as, dropId, dropType, children, className }: Props) {
  const { dragItem, dragType, setDrop, drop, onDrop } = useContext(
    DragContext
  ) as DragContextProps;

  function handleDragOver(e: DragEvent) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  }

  let Component = as || 'div';
  return (
    <Component
      onDragEnter={() => {
        // return dragItem && dropType === dragType && setDrop(dropId);
        return dragItem && setDrop(dropId);
      }}
      onDragOver={handleDragOver}
      onDrop={onDrop}
      className={cn('relative', className)}
    >
      {children}
      {drop === dropId && <div className="absolute inset-0"></div>}
    </Component>
  );
}

export default DropZone;
