import React from "react";
// import { useDraggable } from '@dnd-kit/core'
import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";
import {
  Component,
  UsedComponent,
  EditorHandlerState,
  EditorHandlerProps,
} from "editor";

export default function BaseDragComponent({
  children,
  id,
  data,
  disabled,
}: {
  id: number | string;
  children?: React.ReactNode;
  data?: any;
  disabled?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    active,
  } = useSortable({
    id: id,
    data: { id, ...data },
  });

  //  restrict movement to the y-axis
  // if (transform) {
  //   if(transform.x > 0) transform.x = 0;
  // }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform as Transform),
        transition: transition,
      }}
      // className={isOver ? "bg-gray-200" : "bg-white"}
      className="h-fit"
    >
      {children}
    </div>
  );
}
