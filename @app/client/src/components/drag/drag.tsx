/* eslint-disable */
import { createContext, useState } from 'react';

export type DragContextProps = {
  draggable: boolean;
  dragItem: number | null;
  dragType: string | null;
  isDragging: boolean;
  dragStart: (e: DragEvent, dragId: number, dragType?: string) => void;
  drag: (e: Event) => void;
  dragEnd: () => void;
  drop: any;
  setDrop: React.Dispatch<React.SetStateAction<any>>;
  onDrop?: React.Dispatch<React.SetStateAction<any>>;
};

export type DraggedChildrenProps = {
  activeItem: number | null;
  activeType: string | null;
  isDragging: boolean;
};

export const DragContext = createContext<DragContextProps | null>(null);

type Props = {
  draggable?: boolean;
  handleDrop?: ({ dragItem, dragType, drop }: any) => void;
  children: any;
};

function Drag({ draggable = true, handleDrop, children }: Props) {
  const [dragItem, setDragItem] = useState<number | null>(null);
  const [dragType, setDragType] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [drop, setDrop] = useState(null);

  const dragStart: DragContextProps['dragStart'] = function (
    e,
    dragId,
    dragType
  ) {
    e.stopPropagation();
    e.dataTransfer!.effectAllowed = 'move';
    setDragItem(dragId);
    dragType && setDragType(dragType);
  };

  const drag = function (e: Event) {
    e.stopPropagation();
    setIsDragging(true);
  };

  const dragEnd = function () {
    setDragItem(null);
    setDragType(null);
    setIsDragging(false);
    setDrop(null);
  };

  const onDrop = function (e: Event) {
    e.preventDefault();
    handleDrop && handleDrop({ dragItem, dragType, drop });
    setDragItem(null);
    setDragType(null);
    setIsDragging(false);
    setDrop(null);
  };

  return (
    <DragContext.Provider
      value={{
        draggable,
        dragItem,
        dragType,
        isDragging,
        dragStart,
        drag,
        dragEnd,
        drop,
        setDrop,
        onDrop
      }}
    >
      {typeof children === 'function'
        ? (children({
            activeItem: dragItem,
            activeType: dragType,
            isDragging
          }) as DraggedChildrenProps)
        : children}
    </DragContext.Provider>
  );
}

export default Drag;
