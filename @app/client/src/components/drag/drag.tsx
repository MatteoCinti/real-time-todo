import { createContext, useCallback, useMemo, useState } from 'react';

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

  const dragStart: DragContextProps['dragStart'] = function dragStart(
    e,
    dragId,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    dragType
  ) {
    e.stopPropagation();
    e.dataTransfer!.effectAllowed = 'move';
    setDragItem(dragId);
    if (dragType) {
      setDragType(dragType);
    }
  };

  function drag(e: Event) {
    e.stopPropagation();
    setIsDragging(true);
  }

  function dragEnd() {
    setDragItem(null);
    setDragType(null);
    setIsDragging(false);
    setDrop(null);
  }

  const onDrop = useCallback(
    (e: Event) => {
      e.preventDefault();
      if (handleDrop) {
        handleDrop({ dragItem, dragType, drop });
      }
      setDragItem(null);
      setDragType(null);
      setIsDragging(false);
      setDrop(null);
    },
    [dragItem, dragType, drop, handleDrop]
  );

  const contextValues = useMemo(
    () => ({
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
    }),
    [draggable, dragItem, dragType, isDragging, drop, onDrop]
  );

  return (
    <DragContext.Provider value={contextValues}>
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
