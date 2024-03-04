"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { Component, EditorHandlerState, UsedComponent } from "editor";

import { nanoid } from "@/lib/utils";

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

    if (parent) {
      parent.children.push(newComponent);
      setComponents((prev) => [...prev]);
      return;
    }

    setComponents((prev) => [...prev, newComponent]);
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
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}