import { useContext } from 'react';
import DropZone from './drop-zone';

import { DragContext, DragContextProps } from './drag';

type Props = {
  //   dropType?: string;
  prevId: string;
  nextId: string;
  remember?: 'true' | 'false';
  children: React.ReactNode;
};

function DropZones({ prevId, nextId, remember, children }: Props) {
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const { isDragging } = useContext(DragContext) as DragContextProps;

  return (
    <div style={{ position: 'relative' }}>
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
