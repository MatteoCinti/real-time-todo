import { useContext } from 'react';
import { cn } from '~/lib/utils';

import { DragContext, DragContextProps } from './drag';

type Props = {
  as?: any;
  dropId?: string;
  //   dropType?: string;
  remember?: 'true' | 'false';
  children?: React.ReactNode;
  className?: string;
};

function DropZone({ as, dropId, children, className, remember }: Props) {
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const { dragItem, setDrop, drop, onDrop } = useContext(
    DragContext
  ) as DragContextProps;

  function handleDragOver(e: DragEvent) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  }

  const Component = as || 'div';
  return (
    <Component
      onDragEnter={() => {
        // return dragItem && dropType === dragType && setDrop(dropId);
        return dragItem && setDrop(dropId);
      }}
      onDragOver={(e: DragEvent) => handleDragOver(e)}
      onDrop={onDrop}
      className={cn('relative', className)}
      remember={remember}
    >
      {children}
      {drop === dropId && <div className="absolute inset-0" />}
    </Component>
  );
}

export default DropZone;
