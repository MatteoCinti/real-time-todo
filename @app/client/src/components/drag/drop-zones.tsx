/* eslint-disable */

import React, { useContext } from 'react';
import { DragContext } from './drag';
import DropZone from './drop-zone';
import ErrorComponent from '../error';

type Props = {
  dropType: string;
  prevId: string;
  nextId: string;
  remember?: 'true' | 'false';
  children: React.ReactNode;
};

function DropZones({ dropType, prevId, nextId, remember, children }: Props) {
  const dragContext = useContext(DragContext!);
  if (!dragContext) {
    return <ErrorComponent />;
  }
  const { isDragging } = dragContext;

  return (
    <div style={{ position: 'relative' }}>
      {children}
      {/* {dragType === dropType && isDragging && ( */}
      {isDragging && (
        <div className="absolute inset-0 flex flex-row">
          <DropZone
            className="h-2 w-full"
            dropId={prevId}
            dropType={dropType}
            remember={remember}
          />
          <DropZone
            dropId={nextId}
            className="h-2 w-full"
            dropType={dropType}
            remember={remember}
          />
        </div>
      )}
    </div>
  );
}

export default DropZones;
