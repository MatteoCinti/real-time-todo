import { useContext } from 'react';

import { DragContext } from './drag';
import ErrorComponent from '../error';

type Props = {
  as?: any;
  dragId: number;
  dragType: string;
  className?: string;
  children: React.ReactNode;
};

function DragItem({ as, dragId, dragType, className, children }: Props) {
  const dragContext = useContext(DragContext!);
  if (!dragContext) {
    return <ErrorComponent />;
  }
  const { draggable, dragStart, drag, dragEnd } = dragContext;

  const Component = as || 'div';
  return (
    <Component
      onDragStart={(e: DragEvent) => dragStart(e, dragId, dragType)}
      onDrag={drag}
      draggable={draggable}
      onDragEnd={dragEnd}
      className={className}
    >
      {children}
    </Component>
  );
}

export default DragItem;
