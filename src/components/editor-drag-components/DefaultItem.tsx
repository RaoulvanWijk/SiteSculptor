import React from 'react'
import BaseDropComponent from './BaseDropComponent'
import BaseDragComponent from './BaseDragComponent';
import { cn } from '@/lib/utils';
import { UsedComponent } from 'editor';

export default function DefaultItem(
    {component}: {component: UsedComponent}
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
