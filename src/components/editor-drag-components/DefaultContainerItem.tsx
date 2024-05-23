import React from 'react'
import BaseDropComponent from './BaseDropComponent'
import BaseDragComponent from './BaseDragComponent';
import { cn } from '@/lib/utils';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { UsedComponent } from 'editor';
import DefaultItem from './DefaultItem';
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
            >
                <div
                    className={cn(
                        "w-full border-2",
                        "h-48"
                    )}
                >
                    <SortableContext items={component.children} strategy={horizontalListSortingStrategy}>
                        {/* <p>
                            {component.id} - {component.component.name} -{" "}
                            {component.component.type}, index: {component.index}
                        </p> */}
                        <div className='flex flex-row w-full h-full items-center justify-around'>
                            {
                                component.children.map((child, index) => {
                                    return (
                                        <DefaultItem key={child.id} component={child} />
                                        // <BaseDragComponent key={child.id} id={child.id} data={{ isComponentInEditor: true, dropArea: "container", type: child.component.type }}>
                                        //     <div className={cn("border-2 h-16")}>
                                        //         <p>
                                        //             {child.id} - {child.component.name} -{" "}
                                        //             {child.component.type}, index: {child.index}
                                        //         </p>
                                        //     </div>
                                        // </BaseDragComponent>
                                    )
                                })
                            }
                        </div>
                    </SortableContext>
                </div>
            </BaseDragComponent>
        </div>
    )
}
