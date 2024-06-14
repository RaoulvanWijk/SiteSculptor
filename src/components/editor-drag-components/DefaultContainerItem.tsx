import React from 'react'
import BaseDropComponent from './BaseDropComponent'
import BaseDragComponent from './BaseDragComponent';
import { cn } from '@/lib/utils';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { UsedComponent } from 'editor';
import DefaultItem from './DefaultItem';

import "@/resources/styling/components/editor/components.scss";

export default function DefaultContainerItem(
    {component}: { component: UsedComponent }
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
                    dropArea: "container",
                    type: component.component.type,
                }}
                type='container'
            >
                    {/* {component.id} - {component.component.name} - {component.component.type}, index: {component.index} */}
                    <SortableContext items={component.children} strategy={horizontalListSortingStrategy}>
                            {
                                component.children.map((child, index) => {
                                    return (
                                        <DefaultItem key={child.id} component={child} />
                                    )
                                })
                            }
                    </SortableContext>
            </BaseDragComponent>
        </div>
    )
}
