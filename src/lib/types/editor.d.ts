declare module "editor" {
  type ComponentTypes =
    | "container"
    | "card"
    | "carousel"
    | "image"
    | "text"
    | "button"
    | "form";

  type Component = {
    id: string; // the id of the component
    name: string; // the name of the component (e.g. button, image, etc.)
    type: ComponentTypes; // the type of the component (e.g. button, image, etc.)
    props: {
      [key: string]: string | string[]; // the different props that the component can have (e.g. button text, image source, etc.)
    };
    styles: {
      [key: string]: string | string[]; // the different styles that the component can have (e.g. different button types, different text sizes, etc.)
    };
    hasChildren: boolean; // If the component is allowed to have children components inside itself
    allowedChildren?: ComponentTypes[]; // The types of components that are allowed to be children of this component
  };
  type UsedComponent = {
    id: string; // The id of the component
    index: number; // The index of the component in the editor
    component: Component; // The component that is being used
    props: {
      [key: string]: string | string[]; // The props that the component has
    };
    styles: {
      [key: string]: string | string[]; // The styles that the component has
    };
    children: NestedComponent[]; // The children components of the component
    parent?: string; // The parent component of the component

  };
  
  type NestedComponent = UsedComponent & {
    parent?: string; // The parent component of the component
  };

  type EditorHandlerState = {
    selectedComponent: Component | null; // The component that is currently selected in the editor
    components: UsedComponent[]; // The components that are currently in the editor
    availableComponents: Component[]; // The components that are available to be added to the editor
    isDragging: boolean; // If a component is currently being dragged
    isDraggingOver: boolean; // If a component is currently being dragged over another component
    dragOverComponent: Component | null; // The component that is currently being being dragged over
    dragOverPosition: "top" | "bottom" | "left" | "right"; // The position that the component is being dragged over
  };

  type EditorHandlerProps = {
    availableComponents: Component[]; // The components that are available to be added to the editor
    usedComponents: UsedComponent[]; // The components that are currently in the editor
    onComponentSelect: (component: Component) => void; // The function to call when a component is selected
    onComponentAdd: (component: Component) => void; // The function to call when a component is added to the editor
    onComponentRemove: (component: Component) => void; // The function to call when a component is removed from the editor
    onComponentMove: (
      component: Component,
      position: "top" | "bottom" | "left" | "right"
    ) => void; // The function to call when a component is moved in the editor
    onComponentPropsChange: (
      component: Component,
      props: { [key: string]: string | string[] }
    ) => void; // The function to call when a component's props are changed
    onComponentStylesChange: (
      component: Component,
      styles: { [key: string]: string | string[] }
    ) => void; // The function to call when a component's styles are changed
  };
}

export as namespace editor;