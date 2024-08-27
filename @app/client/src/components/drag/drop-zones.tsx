import { useContext } from 'react';
import { cn } from '~/lib/utils';
import DropZone from './drop-zone';

import { DragContext, DragContextProps } from './drag';

type Props = {
  //   dropType?: string;
  prevId: string;
  nextId: string;
  className?: string;
  remember?: 'true' | 'false';
  children: React.ReactNode;
};

function DropZones({ prevId, nextId, remember, children, className }: Props) {
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const { isDragging } = useContext(DragContext) as DragContextProps;

  return (
    <div className={cn('relative', className)}>
      {children}
      {/* {dragType === dropType && isDragging && ( */}
      {isDragging && (
        <div className="absolute inset-0 flex flex-col">
          <DropZone
            dropId={prevId}
            className="h-full w-full"
            remember={remember}
          />
          <DropZone
            dropId={nextId}
            className="h-full w-full"
            remember={remember}
          />
        </div>
      )}
    </div>
  );
}

export default DropZones;
