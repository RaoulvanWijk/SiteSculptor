import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export default function BaseDropComponent(
  { children, accepts, id }: {
    children?: React.ReactNode,
    accepts?: string[],
    id: number | string,
  }
) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: { accepts },
  })

  return (
    <div ref={setNodeRef} style={{ border: isOver ? '2px solid red' : '2px solid transparent' }}>
      {children}
    </div>
  )
}
