import React from 'react'
import { useDraggable } from '@dnd-kit/core'

export default function TestDragComponent(
  { id, data, children }:
  {
    id: number | string,
    data?: any,
    children?: React.ReactNode
  }
) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({id, data: { id, ...data }});
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      // style={{
      //   transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
      // }}
      className='bg-white p-4 border-2 border-gray-300 rounded-md shadow-md cursor-move'
    >
      {children}
    </div>
  )
}
