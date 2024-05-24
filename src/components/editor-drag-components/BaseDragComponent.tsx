import React from "react";
// import { useDraggable } from '@dnd-kit/core'
import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";
import "@/resources/styling/components/editor/components.scss";

import {
  Component,
  UsedComponent,
  EditorHandlerState,
  EditorHandlerProps,
} from "editor";
import { cn } from "@/lib/utils";

export default function BaseDragComponent({
  children,
  id,
  data,
  disabled,
  type,
}: {
  id: number | string;
  children?: React.ReactNode;
  data?: any;
  disabled?: boolean;
  type?: "container" | "item";
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
      className={
        cn(
          isOver ? "bg-gray-200" : "bg-white",
          type ? (type === "container" ? "base-container" : "base-item") : "base-item"
        )
      }
    >
      {children}
    </div>
  );
}
