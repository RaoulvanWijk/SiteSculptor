import React from "react";
import BaseDropComponent from "./BaseDropComponent";
import BaseDragComponent from "./BaseDragComponent";
import { cn } from "@/lib/utils";
import { NestedComponent, UsedComponent } from "editor";
import "@/resources/styling/components/editor/components.scss";

export default function DefaultItem({
  component,
}: {
  component: NestedComponent;
}) {
  // console.log(component, "component");

  return (
    <div key={component.id}>
      {/* <BaseDropComponent
                id={"droppable-" + component.id}
                data={{
                    isEditorDroppable: true,
                    dropArea: "container-item",
                    index: component.index,
                    parent: component.parent
                }}
                accepts={["draggable-outside-editor"]}
            ></BaseDropComponent> */}
      <BaseDragComponent
        id={component.id}
        data={{
          isComponentInEditor: true,
          dropArea: "container-item",
          type: component.component.type,
          parent: component.parent,
          index: component.index,
        }}
      >
        <p>
          {component.component.name} - {component.index}
           {/* - {component.id} */}
        </p>
      </BaseDragComponent>
    </div>
  );
}
