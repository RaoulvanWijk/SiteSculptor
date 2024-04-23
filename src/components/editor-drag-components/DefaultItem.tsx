import React from 'react'
import BaseDropComponent from './BaseDropComponent'
import BaseDragComponent from './BaseDragComponent';
import { cn } from '@/lib/utils';

export default function DefaultItem(
    component: { id: string; index: number; component: { type: string; name: string } }
) {
    return (
        <div key={component.id}>
            <BaseDropComponent
                id={"droppable-" + component.id}
                data={{
                    isEditorDroppable: true,
                    dropArea: "editor",
                    index: component.index,
                }}
                accepts={["draggable-outside-editor"]}
            ></BaseDropComponent>
            <BaseDragComponent
                id={component.id}
                data={{
                    isComponentInEditor: true,
                    dropArea: "editor",
                    type: component.component.type,
                }}
            >
                <div
                    className={cn(
                        "w-full border-2",
                        "h-16"
                    )}
                >
                    <p>
                        {component.id} - {component.component.name} -{" "}
                        {component.component.type}, index: {component.index}
                    </p>
                </div>
            </BaseDragComponent>
        </div>
    )
}
