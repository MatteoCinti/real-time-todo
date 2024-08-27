/* eslint-disable */
import React, { useContext } from 'react';
import DropZone from './drop-zone';

// context
import { DragContext, DragContextProps } from './drag';

interface Props {
  dropType: string;
  prevId: string;
  nextId: string;
  remember?: 'true' | 'false';
  children: React.ReactNode;
}

function DropZones({ dropType, prevId, nextId, remember, children }: Props) {
  const { dragType, isDragging } = useContext(DragContext) as DragContextProps;

  return (
    <div style={{ position: 'relative' }}>
      {children}
      {/* {dragType === dropType && isDragging && ( */}
      {isDragging && (
        <div className="absolute inset-0 flex flex-col">
          <DropZone
            dropId={prevId}
            className="h-full w-full"
            dropType={dropType}
            remember={remember}
          />
          <DropZone
            dropId={nextId}
            className="h-full w-full"
            dropType={dropType}
            remember={remember}
          />
        </div>
      )}
    </div>
  );
}

export default DropZones;
