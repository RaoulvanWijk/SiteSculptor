"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import {
  Component,
  EditorHandlerState,
  NestedComponent,
  UsedComponent,
} from "editor";

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
  addComponent: (
    component: Component,
    index: number,
    parent?: UsedComponent
  ) => void;
  removeComponent: (component: UsedComponent) => void;
  updateComponent: (component: UsedComponent) => void;

  selectedComponent: UsedComponent | null;
  setSelectedComponent: Dispatch<SetStateAction<UsedComponent | null>>;
  RenderComponents: () => ReactNode;
  handleDragEnd: (event: DragEndEvent) => void;
};

export const EditorContext = createContext<EditorContextType | null>(null);

export default function EditorContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [componentsInEditor, setComponents] = useState<UsedComponent[]>([]);
  const [availableComponents, setAvailableComponents] = useState<Component[]>(
    []
  );

  const [selectedComponent, setSelectedComponent] =
    useState<UsedComponent | null>(null);

  const addComponent = (
    component: Component,
    index: number,
    parent?: UsedComponent,
    usingComponent?: NestedComponent
  ) => {
    if (parent) {
      if (index == -1) index = parent.children.length;
      if (usingComponent) {
        const oldParent = usingComponent.parent;
        usingComponent.parent = parent.id;
        parent.children.splice(index, 0, usingComponent);
        let newComponents = [...componentsInEditor];
        newComponents = newComponents.map((c, i) => ({ ...c, index: i }));
        newComponents = newComponents.map((c) => {
          if (c.id === oldParent) {
            // resort the old parent components so that the index is correct
            return updateIndexesOfContainer(c);
          }
          return c;
        });

        newComponents = newComponents.map((c) => {
          if (c.id === parent.id) {
            return {
              ...c,
              children: reorderComponents(index, index + 1, parent.children),
            };
          }
          return c;
        });

        setComponents(newComponents);
        return;
      }
      const newComponent: UsedComponent = {
        id: nanoid(10),
        index,
        component,
        props: {},
        styles: {},
        children: [],
      };
      parent.children.splice(index, 0, newComponent);
      let newComponents = [...componentsInEditor];
      setComponents(newComponents);
      return;
    }

    const newComponent: UsedComponent = {
      id: nanoid(10),
      index,
      component,
      props: {},
      styles: {},
      children: [],
    };

    // add the new component to the list of components with the new index and replace the old list indexes with the new ones
    let newComponents = [...componentsInEditor];
    newComponents.splice(index, 0, newComponent);

    newComponents = newComponents.map((c, i) => ({ ...c, index: i }));

    setComponents(newComponents);
  };

  const removeComponent = (component: UsedComponent) => {
    // find the component in the editor it can be a parent or a child
    let newArr;
    setComponents((prev) => {
      const parent = prev.find((c) =>
        c.children.find((child) => child.id === component.id)
      );
      if (parent) {
        parent.children = parent.children.filter(
          (child) => child.id !== component.id
        );
        return [...prev];
      }
      console.log("Parent not found", component, prev);
      newArr = prev.filter((c) => c.id !== component.id);
      return newArr;
    });
    return newArr ? [...newArr] : componentsInEditor;
  };

  const updateComponent = (component: UsedComponent) => {
    setComponents((prev) => {
      const index = prev.findIndex((c) => c.id === component.id);
      prev[index] = component;
      return [...prev];
    });
  };

  const RenderComponent = ({
    component,
  }: {
    component: UsedComponent | NestedComponent;
  }) => {
    if (component.component.type === "container") {
      return <DefaultContainerItem component={component} />;
    }
    return <></>;
  };

  const handleNestedComponents = (component: UsedComponent) => {};

  const updateIndexesOfContainer = (component: UsedComponent) => {
    component.children = component.children.map((child, index) => ({
      ...child,
      index,
    }));
    return component;
  };

  const RenderComponents = () => {
    let lastIndex = -1;
    return (
      <>
        {componentsInEditor.map((component, index) => {
          lastIndex = component.index;
          return (
            <RenderComponent
              key={component.id + component.index}
              component={component}
            />
          );
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
    );
  };

  const isinValidDrop = (event: any) => {
    /**
     * Valid drop if:
     * - The pointer is over an element
     * - The pointer is not over an element that is not a droppable container
     */
    return !event.over || !event.active;
  };

  const isInEditor = (event: any) => {
    return event.active.data.current?.isComponentInEditor;
  };

  const isFromSideNav = (event: any) => {
    return event.active.data.current?.isFromSideNav;
  };

  const getOverIndex = (event: DragEndEvent) => {
    return (
      event.over?.data.current?.sortable?.index ??
      event.over?.data.current?.index ??
      0
    );
  };

  const getActiveIndex = (event: DragEndEvent) => {
    return event.active.data.current?.sortable?.index;
  };

  const findParent = (event: DragEndEvent, current?: boolean) => {
    return componentsInEditor.find((c) =>
      c.children.find(
        (child) => child.id === (current ? event.active.id : event.over?.id)
      )
    );
  };

  const reorderComponents = (
    oldIdx: number,
    newIdx: number,
    arr?: UsedComponent[]
  ) => {
    if (arr) {
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
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (isinValidDrop(event)) {
      console.log("Invalid drop area");
      return;
    }
    let activeComponent = componentsInEditor.find(
      (c) => c.id === event.active.id
    );
    if (!activeComponent) {
      // try to find the component in the nested components
      componentsInEditor.forEach((c) => {
        const nested = c.children.find((child) => child.id === event.active.id);
        if (nested) {
          activeComponent = nested as NestedComponent;
        }
      });
    }
    if (event.over?.data.current?.dropArea === "sideNav") {
      console.log("Component is being dragged to the side nav");
      if (!activeComponent) return;
      let newComponents = removeComponent(activeComponent);
      // resort the parent components so that the index is correct

      newComponents = newComponents.map((c, i) => {
        return updateIndexesOfContainer(c);
      });
      
      setComponents(newComponents);
      return;
    }

    if (isInEditor(event)) {
      console.log("Component is being dragged within the editor");
      if (event.over?.data.current?.dropArea === "container-item") {
        console.log("Component is being within a container");
        //  handle nested components

        // Get the parent component of the component being dragged over
        const parent = findParent(event);
        if (!parent) return;

        // check if the component is being dragged into another container than the one it was in
        if (parent.id !== findParent(event, true)?.id) {
          if (!activeComponent) return;
          removeComponent(activeComponent);
          const idx = getOverIndex(event);
          addComponent(activeComponent.component, idx, parent, activeComponent);
          return;
        }

        const co = reorderComponents(
          getActiveIndex(event),
          getOverIndex(event),
          parent?.children
        );
        // replace the parent component with the new one
        const newParent = { ...parent, children: co };
        const newComponents = componentsInEditor.map((c) => {
          if (c.id === parent?.id) return newParent;
          return c;
        });
        return setComponents(newComponents);
      }

      if (
        event.over?.data.current?.dropArea === "container" &&
        event.active?.data.current?.dropArea !== "container"
      ) {
        const parent = componentsInEditor.find((c) => c.id === event.over?.id);
        const oldParent = findParent(event, true);

        if (!parent || !activeComponent) return;

        removeComponent(activeComponent);
        activeComponent.index = 0
        parent.children.push(activeComponent);
        let newComponents = [...componentsInEditor];
        newComponents = newComponents.map((c, i) => ({ ...c, index: i }));
        newComponents = newComponents.map((c) => {
          if (c.id === oldParent?.id) {
            // resort the old parent components so that the index is correct
            return updateIndexesOfContainer(c);
          }
          if (c.id === parent.id) {
            return { ...c, children: parent.children };
          }
          return c;
        });
        return setComponents(newComponents);
      }
      return setComponents(
        reorderComponents(getActiveIndex(event), getOverIndex(event))
      );
    }

    if (isFromSideNav(event)) {
      console.log("Component is being dragged from the side nav");
      const newComponent = availableComponents.find(
        (c) => c.id === event.active.id
      );
      if (!newComponent) return;
      let parent = componentsInEditor.find((c) => c.id === event.over?.id);
      if (!parent) {
        // check if the component is being dragged over a container by checking if the component is a child of a container
        parent = findParent(event);
      }

      const idx = parent
        ? parent.children.length == 0
          ? 0
          : getOverIndex(event) + 1
        : getOverIndex(event);
      addComponent(newComponent, idx, parent);
      return;
    }
  };

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
        RenderComponents,
        handleDragEnd,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
