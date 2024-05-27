import { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";

import BaseDragComponent from "@/components/editor-drag-components/BaseDragComponent";

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;

  // console.log("====================================");
  // console.log(draggedItem);
  // console.log("====================================");
  // if (draggedItem.data.current?.isComponentInEditor) {
  //   return null;
  //   // node = <DragOverlay>{draggedItem.data.current.id}</DragOverlay>;
  // }

  return (
    <DragOverlay>
      <BaseDragComponent id={draggedItem.id} data={draggedItem.data.current} extraStyling="opacity-90">
        <p>
          {draggedItem.data.current?.id}
        </p>
      </BaseDragComponent>
    </DragOverlay>
  );
  // console.log(draggedItem?.data?.current?.sortable);

  // node = <DragOverlay>{draggedItem.data.current}</DragOverlay>;
  return <>{node}</>;
}
