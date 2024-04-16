import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function BaseDropComponent({
  children,
  accepts,
  data,
  id,
  disabled,
}: {
  children?: React.ReactNode;
  accepts?: string[];
  data?: any;
  id: number | string;
  disabled?: boolean;
}) {
  const { isOver, setNodeRef, over, active } = useDroppable({
    id: id,
    data: { accepts, id, ...data},
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ border: isOver ? "2px solid red" : "" }}
      className={isOver && !active?.data.current?.isComponentInEditor ? "h-16" : "bg-white"}
    >
      {children}
    </div>
  );
}
