import React from 'react'
import "@/resources/styling/components/layouts/editor-layout.scss"
export default function EditorLayout(
    {
        children
    }: {
        children: React.ReactNode
    }
) {
  return (
    <div className='editor-container'>{children}</div>
  )
}
