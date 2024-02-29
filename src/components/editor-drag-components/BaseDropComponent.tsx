import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export default function BaseDropComponent(
  { children, accepts }: {
    children?: React.ReactNode,
    accepts?: string[],
  }
) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'drop-component',
    data: {
      accepts,
    }
  })
  return (
    <div
      ref={setNodeRef}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: isOver ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
      }}
    >
      Drop component
    </div>
  )
}
