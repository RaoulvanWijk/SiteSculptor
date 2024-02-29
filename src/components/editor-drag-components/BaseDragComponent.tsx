import React from 'react'
import { useDraggable } from '@dnd-kit/core'

export default function BaseDragComponent(
  { children, component }: {
    component: {
      id: string,
      type: string,
    },
    children?: React.ReactNode,
  }
) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: component.id,
    data: {
      type: component.type,
    }
  })



  return (
    <div
      ref={setNodeRef}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        transform: `translate(${transform?.x}px, ${transform?.y}px)`,
      }}
      {...listeners}
      {...attributes}
    >
      Drag component
    </div>
  )
}
