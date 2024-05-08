"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { Component, EditorHandlerState, NestedComponent, UsedComponent } from "editor";

import { cn, nanoid } from "@/lib/utils";
import BaseDropComponent from "../editor-drag-components/BaseDropComponent";
import BaseDragComponent from "../editor-drag-components/BaseDragComponent";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import DefaultItem from "../editor-drag-components/DefaultItem";
import DefaultContainerItem from "../editor-drag-components/DefaultContainerItem";

type EditorContextType = {
  componentsInEditor: UsedComponent[];
  availableComponents: Component[];
  setComponents: Dispatch<SetStateAction<UsedComponent[]>>;
  setAvailableComponents: Dispatch<SetStateAction<Component[]>>;
  addComponent: (component: Component, index: number, parent?: UsedComponent) => void;
  removeComponent: (component: UsedComponent) => void;
  updateComponent: (component: UsedComponent) => void;

  selectedComponent: UsedComponent | null;
  setSelectedComponent: Dispatch<SetStateAction<UsedComponent | null>>;
  renderComponents: () => ReactNode;
  handleDragEnd: (event: DragEndEvent) => void;
};

export const EditorContext = createContext<EditorContextType | null>(null);

export default function EditorContextProvider({ children }: { children: ReactNode }) {
  const [componentsInEditor, setComponents] = useState<UsedComponent[]>([]);
  const [availableComponents, setAvailableComponents] = useState<Component[]>([]);

  const [selectedComponent, setSelectedComponent] = useState<UsedComponent | null>(null);

  const addComponent = (component: Component, index: number, parent?: UsedComponent) => {
    const newComponent: UsedComponent = {
      id: nanoid(10),
      index,
      component,
      props: {},
      styles: {},
      children: [],
    };

    // if (parent) {
    //   parent.children.push(newComponent);
    //   setComponents((prev) => [...prev]);
    //   return;
    // }

    // add the new component to the list of components with the new index and replace the old list indexes with the new ones
    let newComponents = [...componentsInEditor];
    newComponents.splice(index, 0, newComponent);
    newComponents = newComponents.map((c, i) => ({ ...c, index: i }));

    setComponents(newComponents);
  };

  const removeComponent = (component: UsedComponent) => {
    setComponents((prev) => prev.filter((c) => c.id !== component.id));
  };

  const updateComponent = (component: UsedComponent) => {
    setComponents((prev) => {
      const index = prev.findIndex((c) => c.id === component.id);
      prev[index] = component;
      return [...prev];
    });
  };

  const renderComponent = (component: UsedComponent | NestedComponent) => {
    if(component.component.type === "container") {
      return (
        <DefaultContainerItem component={component} />
      )
    }
    // return (
    //   <DefaultItem component={component} />
    // )
  }

  const handleNestedComponents = (component: UsedComponent) => {
    
  }

  const renderComponents = () => {
    let lastIndex = -1;
    return (
      <>
        {componentsInEditor.map((component, index) => {
          lastIndex = component.index;
          return (renderComponent(component))
        })}
        <BaseDropComponent
                id={"droppable-" + lastIndex}
                data={{
                    isEditorDroppable: true,
                    dropArea: "editor",
                    index: lastIndex + 1,
                }}
                accepts={["draggable-outside-editor"]}
            ></BaseDropComponent>
      </>
    )
  }

  const isinValidDrop = (event: any) => {
    /**
     * Valid drop if:
     * - The pointer is over an element
     * - The pointer is not over an element that is not a droppable container
     */
    return !event.over || !event.active;
  }

  const isInEditor = (event: any) => {
    return event.active.data.current?.isComponentInEditor;
  }

  const isFromSideNav = (event: any) => {
    return event.active.data.current?.isFromSideNav;
  }

  const getOverIndex = (event: DragEndEvent) => {
    return event.over?.data.current?.sortable?.index ?? event.over?.data.current?.index ?? 0;
  }

  const getActiveIndex = (event: DragEndEvent) => {
    return event.active.data.current?.sortable?.index;
  }

  const findParent = (event: DragEndEvent) => {
    return componentsInEditor.find((c) => c.children.find((child) => child.id === event.over?.id));
  }

  const reorderComponents = (oldIdx: number, newIdx: number, arr?: UsedComponent[]) => {
    if(arr) {
      let newArr = arrayMove(arr, oldIdx, newIdx);
      return newArr.map((component, index) => {
        component.index = index;
        return component;
      });
    }
    let newArr = arrayMove(componentsInEditor, oldIdx, newIdx);
    return newArr.map((component, index) => {
      component.index = index;
      return component;
    });
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if(isinValidDrop(event)) {
      console.log("Invalid drop area");
      return
    };
    const activeComponent = componentsInEditor.find((c) => c.id === event.active.id);

    console.log(event.over?.data.current?.dropArea);
    if(event.over?.data.current?.dropArea === "sideNav") {
      console.log("Component is being dragged to the side nav", componentsInEditor.find((c) => c.id === event.active.id));
      if(!activeComponent) return
      removeComponent(activeComponent);
      return;
    }

    if(isInEditor(event)) {
      console.log("Component is being dragged within the editor");
      if(event.over?.data.current?.dropArea === "container-item") { 
        console.log("Component is being within a container");
        //  handle nested components

        // Get the parent component of the component being dragged over
        const parent = findParent(event);
        if(!parent) return;
        const co = reorderComponents(getActiveIndex(event), getOverIndex(event), parent?.children);
        // replace the parent component with the new one
        const newParent = { ...parent, children: co };
        const newComponents = componentsInEditor.map((c) => {
          if(c.id === parent?.id) return newParent;
          return c;
        });
        return setComponents(newComponents);
      }
      return setComponents(reorderComponents(getActiveIndex(event), getOverIndex(event)));
      
    }

    if(isFromSideNav(event)) {
      console.log("Component is being dragged from the side nav");
      const newComponent = availableComponents.find((c) => c.id === event.active.id);
      if(!newComponent) return;
      
      return addComponent(newComponent, getOverIndex(event));
    }

    // if()
      
  }


  return (
    <EditorContext.Provider
      value={{
        componentsInEditor,
        availableComponents,
        setComponents,
        setAvailableComponents,
        addComponent,
        removeComponent,
        updateComponent,
        selectedComponent,
        setSelectedComponent,
        renderComponents,
        handleDragEnd
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}