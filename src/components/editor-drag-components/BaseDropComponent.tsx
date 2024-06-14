import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

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
      style={{ border: isOver ? "" : "" }}
      className={cn("transition-all ease-in-out duration-200 container opacity-20 rounded-lg",(isOver ? "h-48 min-h-48 mb-4 bg-black" : "h-0 min-h-0 bg-white"))}
    >
      {children}
    </div>
  );
}
